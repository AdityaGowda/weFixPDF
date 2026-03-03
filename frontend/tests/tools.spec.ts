import { test, expect } from '@playwright/test';
import * as path from 'path';

// ─────────────────────────────────────────────────────────────
// Fixture directory
// ─────────────────────────────────────────────────────────────
const FIXTURES = path.join(__dirname, 'fixtures');

// ─────────────────────────────────────────────────────────────
// All active tools with their test configs
// ─────────────────────────────────────────────────────────────
const ALL_TOOLS = [
  // ── Image Conversion Tools ──
  { name: 'JPG to PNG', slug: '/jpg-to-png', isMulti: false, inputFiles: ['test.jpg'], acceptExt: /\.png$/i },
  { name: 'PNG to JPG', slug: '/png-to-jpg', isMulti: false, inputFiles: ['test.png'], acceptExt: /\.jpg$/i },
  { name: 'PNG to WEBP', slug: '/png-to-webp', isMulti: false, inputFiles: ['test.png'], acceptExt: /\.webp$/i },
  { name: 'Image Compressor', slug: '/image-compressor', isMulti: false, inputFiles: ['test.jpg'], acceptExt: /\.(jpg|png|webp)$/i },

  // ── PDF Tools ──
  { name: 'Compress PDF', slug: '/compress-pdf', isMulti: false, inputFiles: ['test.pdf'], acceptExt: /\.pdf$/i },
  { name: 'PDF to JPG', slug: '/pdf-to-jpg', isMulti: false, inputFiles: ['test.pdf'], acceptExt: /\.(jpg|zip)$/i },
  { name: 'PDF to Word', slug: '/pdf-to-word', isMulti: false, inputFiles: ['test.pdf'], acceptExt: /\.docx$/i },
  { name: 'Split PDF', slug: '/split-pdf', isMulti: false, inputFiles: ['test.pdf'], acceptExt: /\.(pdf|zip)$/i },
  { name: 'Merge PDF', slug: '/merge-pdf', isMulti: true, inputFiles: ['test.pdf', 'test2.pdf'], acceptExt: /\.pdf$/i },
  { name: 'Image to PDF', slug: '/image-to-pdf', isMulti: true, inputFiles: ['test.jpg', 'test.png'], acceptExt: /\.pdf$/i },

  // ── HEIC Tool ──
  { name: 'HEIC to JPG', slug: '/heic-to-jpg', isMulti: false, inputFiles: ['test.heic'], acceptExt: /\.jpg$/i },
];

// ═══════════════════════════════════════════════════════════════
// TEST SUITE 1:  Page Load & SEO Tests
// Verifies every tool page loads correctly, has proper SEO
// elements, and renders the upload UI.
// ═══════════════════════════════════════════════════════════════

test.describe('Tool Pages — SEO & UI Rendering', () => {
  for (const tool of ALL_TOOLS) {
    test.describe(`${tool.name}`, () => {

      test('page loads with H1 heading', async ({ page }) => {
        await page.goto(tool.slug);
        const h1 = page.locator('h1').first();
        await expect(h1).toBeVisible({ timeout: 10000 });
        const text = await h1.textContent();
        expect(text!.length).toBeGreaterThan(3);
      });

      test('has meta title tag', async ({ page }) => {
        await page.goto(tool.slug);
        const title = await page.title();
        expect(title.length).toBeGreaterThan(10);
        expect(title.toLowerCase()).toContain('wefixpdf');
      });

      test('has file upload input', async ({ page }) => {
        await page.goto(tool.slug);
        const fileInput = page.locator('input[type="file"]');
        await expect(fileInput).toBeAttached({ timeout: 10000 });
      });

      test('has proper accept attribute', async ({ page }) => {
        await page.goto(tool.slug);
        const fileInput = page.locator('input[type="file"]');
        const accept = await fileInput.getAttribute('accept');
        expect(accept).toBeTruthy();
        expect(accept!.length).toBeGreaterThan(0);
      });

      test('displays FAQ section', async ({ page }) => {
        await page.goto(tool.slug);
        // Check for FAQ content — either FAQ heading or FAQ items
        const faqSection = page.locator('text=/FAQ|Frequently Asked/i').first();
        await expect(faqSection).toBeVisible({ timeout: 10000 });
      });

      test('displays features section', async ({ page }) => {
        await page.goto(tool.slug);
        const features = page.locator('text=/feature/i').first();
        await expect(features).toBeVisible({ timeout: 10000 });
      });

      test('has structured data (JSON-LD)', async ({ page }) => {
        await page.goto(tool.slug);
        const jsonLd = page.locator('script[type="application/ld+json"]');
        const count = await jsonLd.count();
        expect(count).toBeGreaterThan(0);
      });
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// TEST SUITE 2:  File Upload & Conversion Flow
// Full E2E: upload file → click convert → verify download
// ═══════════════════════════════════════════════════════════════

test.describe('Tool Conversion — Full E2E Flow', () => {
  for (const tool of ALL_TOOLS) {
    test.describe(`${tool.name} Conversion`, () => {
      // Conversion can take time (server processing)
      test.setTimeout(60000);

      test('upload → convert → download', async ({ page }) => {
        await page.goto(tool.slug);

        // ── Step 1: Upload file(s) ──
        const fileInput = page.locator('input[type="file"]');
        await expect(fileInput).toBeAttached({ timeout: 10000 });

        const filePaths = tool.inputFiles.map(f => path.join(FIXTURES, f));
        await fileInput.setInputFiles(filePaths);

        // Wait for UI to update after upload
        await page.waitForTimeout(1500);

        // ── Step 2: Verify file loaded state ──
        if (tool.isMulti) {
          // Multi-file: look for file count or MERGE button
          const actionBtn = page.locator('button', { hasText: /MERGE|CONVERT|INITIATE/i });
          await expect(actionBtn).toBeVisible({ timeout: 5000 });
        } else {
          // Single-file: should show file name or "READY"
          const actionBtn = page.locator('button', { hasText: /INITIATE|CONVERT/i });
          await expect(actionBtn).toBeVisible({ timeout: 5000 });
        }

        // ── Step 3: Start conversion ──
        const actionButton = page.locator('button', { hasText: /INITIATE|MERGE|CONVERT/i });
        await actionButton.click();

        // ── Step 4: Wait for completion ──
        // The "RETRIEVE" download link appears on success
        const retrieveLink = page.locator('a', { hasText: /RETRIEVE/i });
        await expect(retrieveLink).toBeVisible({ timeout: 30000 });

        // ── Step 5: Verify download link ──
        const href = await retrieveLink.getAttribute('href');
        expect(href).toMatch(/^blob:/);

        // ── Step 6: Test actual download ──
        const downloadPromise = page.waitForEvent('download');
        await retrieveLink.click();
        const download = await downloadPromise;

        // Verify filename exists
        const filename = download.suggestedFilename();
        expect(filename).toBeTruthy();
        expect(filename.length).toBeGreaterThan(3);

        // Verify file extension matches expected output
        expect(filename).toMatch(tool.acceptExt);
      });
    });
  }
});

// ═══════════════════════════════════════════════════════════════
// TEST SUITE 3:  Upload Validation & Edge Cases
// Tests error handling, file type restrictions, etc.
// ═══════════════════════════════════════════════════════════════

test.describe('Upload Validation & Edge Cases', () => {

  test('should show upload area without files', async ({ page }) => {
    await page.goto('/jpg-to-png');
    // Upload icon / drop text should be visible
    const dropText = page.locator('text=/Drop File|Drop Files/i');
    await expect(dropText).toBeVisible({ timeout: 10000 });

    // INITIATE button should NOT be visible without a file
    const actionBtn = page.locator('button', { hasText: /INITIATE/i });
    await expect(actionBtn).not.toBeVisible();
  });

  test('should accept multiple files for merge-pdf', async ({ page }) => {
    await page.goto('/merge-pdf');
    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toBeAttached();

    // File input should have multiple attribute
    const multiple = await fileInput.getAttribute('multiple');
    expect(multiple).not.toBeNull();

    // Upload 2 PDFs
    await fileInput.setInputFiles([
      path.join(FIXTURES, 'test.pdf'),
      path.join(FIXTURES, 'test2.pdf'),
    ]);

    await page.waitForTimeout(1500);

    // Should show file count
    const fileCount = page.locator('text=/2/');
    await expect(fileCount).toBeVisible({ timeout: 5000 });
  });

  test('should accept multiple files for image-to-pdf', async ({ page }) => {
    await page.goto('/image-to-pdf');
    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toBeAttached();

    // Upload 2 images
    await fileInput.setInputFiles([
      path.join(FIXTURES, 'test.jpg'),
      path.join(FIXTURES, 'test.png'),
    ]);

    await page.waitForTimeout(1500);

    // Should show MERGE button for multiple files
    const mergeBtn = page.locator('button', { hasText: /MERGE/i });
    await expect(mergeBtn).toBeVisible({ timeout: 5000 });
  });

  test('single file for non-multi tool replaces previous file', async ({ page }) => {
    await page.goto('/jpg-to-png');
    const fileInput = page.locator('input[type="file"]');

    // Upload first file
    await fileInput.setInputFiles(path.join(FIXTURES, 'test.jpg'));
    await page.waitForTimeout(1000);

    // Upload second file — should replace, not add
    await fileInput.setInputFiles(path.join(FIXTURES, 'test.jpg'));
    await page.waitForTimeout(1000);

    // INITIATE button should be visible (single file loaded)
    const actionBtn = page.locator('button', { hasText: /INITIATE/i });
    await expect(actionBtn).toBeVisible();
  });

  test('clear all button removes files', async ({ page }) => {
    await page.goto('/jpg-to-png');
    const fileInput = page.locator('input[type="file"]');

    await fileInput.setInputFiles(path.join(FIXTURES, 'test.jpg'));
    await page.waitForTimeout(1000);

    // Click the reset/clear button (RefreshCcw icon)
    const clearBtn = page.locator('button').filter({ has: page.locator('svg.lucide-refresh-ccw') });
    if (await clearBtn.isVisible()) {
      await clearBtn.click();
      await page.waitForTimeout(500);

      // INITIATE should be gone
      const actionBtn = page.locator('button', { hasText: /INITIATE/i });
      await expect(actionBtn).not.toBeVisible();
    }
  });

  test('HEIC to JPG only accepts .heic/.heif files', async ({ page }) => {
    await page.goto('/heic-to-jpg');
    const fileInput = page.locator('input[type="file"]');
    const accept = await fileInput.getAttribute('accept');
    expect(accept).toContain('.heic');
    expect(accept).toContain('.heif');
  });

  test('merge-pdf only accepts .pdf files', async ({ page }) => {
    await page.goto('/merge-pdf');
    const fileInput = page.locator('input[type="file"]');
    const accept = await fileInput.getAttribute('accept');
    expect(accept).toContain('.pdf');
  });

  test('pdf-to-word only accepts .pdf files', async ({ page }) => {
    await page.goto('/pdf-to-word');
    const fileInput = page.locator('input[type="file"]');
    const accept = await fileInput.getAttribute('accept');
    expect(accept).toContain('.pdf');
  });
});

// ═══════════════════════════════════════════════════════════════
// TEST SUITE 4:  Merge PDF — Multi-file Specific Tests
// ═══════════════════════════════════════════════════════════════

test.describe('Merge PDF — Multi-file Features', () => {
  test.setTimeout(45000);

  test('shows file list with drag-to-reorder UI', async ({ page }) => {
    await page.goto('/merge-pdf');
    const fileInput = page.locator('input[type="file"]');

    await fileInput.setInputFiles([
      path.join(FIXTURES, 'test.pdf'),
      path.join(FIXTURES, 'test2.pdf'),
    ]);

    await page.waitForTimeout(2000);

    // File list should be visible with numbered badges
    const fileList = page.locator('text=/drag to reorder/i');
    await expect(fileList).toBeVisible({ timeout: 5000 });

    // Should show 2 file items
    const fileItems = page.locator('text=/test.*\\.pdf/i');
    expect(await fileItems.count()).toBeGreaterThanOrEqual(2);
  });

  test('can remove individual files from list', async ({ page }) => {
    await page.goto('/merge-pdf');
    const fileInput = page.locator('input[type="file"]');

    await fileInput.setInputFiles([
      path.join(FIXTURES, 'test.pdf'),
      path.join(FIXTURES, 'test2.pdf'),
    ]);

    await page.waitForTimeout(2000);

    // Click remove button on first file
    const removeBtn = page.locator('button').filter({ has: page.locator('svg.lucide-x') }).first();
    if (await removeBtn.isVisible()) {
      await removeBtn.click();
      await page.waitForTimeout(500);

      // Should now show 1 file
      const fileCount = page.locator('text=/1 \\//i');
      await expect(fileCount).toBeVisible();
    }
  });

  test('"Clear all" removes all files', async ({ page }) => {
    await page.goto('/merge-pdf');
    const fileInput = page.locator('input[type="file"]');

    await fileInput.setInputFiles([
      path.join(FIXTURES, 'test.pdf'),
      path.join(FIXTURES, 'test2.pdf'),
    ]);

    await page.waitForTimeout(2000);

    // Click "Clear all" link
    const clearAll = page.locator('button', { hasText: /Clear all/i });
    if (await clearAll.isVisible()) {
      await clearAll.click();
      await page.waitForTimeout(500);

      // Drop area should reappear
      const dropText = page.locator('text=/Drop Files/i');
      await expect(dropText).toBeVisible();
    }
  });
});

// ═══════════════════════════════════════════════════════════════
// TEST SUITE 5:  Split PDF — Page Range Input
// ═══════════════════════════════════════════════════════════════

test.describe('Split PDF — Page Range Features', () => {
  test.setTimeout(45000);

  test('upload and split without specifying pages (splits all)', async ({ page }) => {
    await page.goto('/split-pdf');
    const fileInput = page.locator('input[type="file"]');

    await fileInput.setInputFiles(path.join(FIXTURES, 'test.pdf'));
    await page.waitForTimeout(1500);

    // Click INITIATE
    const actionBtn = page.locator('button', { hasText: /INITIATE/i });
    await expect(actionBtn).toBeVisible();
    await actionBtn.click();

    // Wait for download
    const retrieveLink = page.locator('a', { hasText: /RETRIEVE/i });
    await expect(retrieveLink).toBeVisible({ timeout: 20000 });

    const href = await retrieveLink.getAttribute('href');
    expect(href).toMatch(/^blob:/);
  });
});

// ═══════════════════════════════════════════════════════════════
// TEST SUITE 6:  Homepage Tool Grid
// Verifies all tools appear on homepage and link correctly.
// ═══════════════════════════════════════════════════════════════

test.describe('Homepage — Tool Grid', () => {

  test('all 10 tools are displayed as active on homepage', async ({ page }) => {
    await page.goto('/');

    // All tool cards should be active (no "Coming Soon")
    const activeCards = page.locator('a.group');
    const count = await activeCards.count();
    expect(count).toBeGreaterThanOrEqual(10);

    // No "cursor-not-allowed" (no disabled tools)
    const disabledCards = page.locator('a.group.cursor-not-allowed');
    expect(await disabledCards.count()).toBe(0);
  });

  test('each tool card has a valid href', async ({ page }) => {
    await page.goto('/');

    const toolCards = page.locator('a.group');
    const count = await toolCards.count();

    for (let i = 0; i < count; i++) {
      const href = await toolCards.nth(i).getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).toMatch(/^\//);  // starts with /
    }
  });

  test('clicking a tool card navigates to the tool page', async ({ page }) => {
    await page.goto('/');

    // Click the first tool
    const firstTool = page.locator('a.group').first();
    const href = await firstTool.getAttribute('href');
    await firstTool.click();

    await expect(page).toHaveURL(new RegExp(`${href}$`));

    // Should have an H1
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('new tools (Merge PDF, Split PDF, PDF to Word, HEIC to JPG) are on homepage', async ({ page }) => {
    await page.goto('/');

    const pageContent = await page.textContent('body');
    expect(pageContent).toContain('Merge PDF');
    expect(pageContent).toContain('Split PDF');
    expect(pageContent).toContain('PDF to Word');
    expect(pageContent).toContain('HEIC to JPG');
  });

  test('all tool cards show "Active" badge', async ({ page }) => {
    await page.goto('/');

    const activeBadges = page.locator('text=Active');
    const count = await activeBadges.count();
    expect(count).toBeGreaterThanOrEqual(10);
  });
});

// ═══════════════════════════════════════════════════════════════
// TEST SUITE 7:  Navigation & Responsiveness
// ═══════════════════════════════════════════════════════════════

test.describe('Navigation & Layout', () => {

  test('navigation bar is visible', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav, header').first();
    await expect(nav).toBeVisible();
  });

  test('tool page has breadcrumb-like navigation back to home', async ({ page }) => {
    await page.goto('/compress-pdf');
    // Should have a link back to home somewhere
    const homeLink = page.locator('a[href="/"]').first();
    await expect(homeLink).toBeVisible();
  });

  test('trust badges are visible on tool pages', async ({ page }) => {
    await page.goto('/jpg-to-png');
    // Trust badges (Shield, Zap, Clock icons)
    const trustArea = page.locator('svg.lucide-shield, svg.lucide-zap, svg.lucide-clock').first();
    await expect(trustArea).toBeAttached();
  });
});
