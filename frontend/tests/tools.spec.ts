import { test, expect } from '@playwright/test';
import * as path from 'path';

const activeTools = [
  { name: 'JPG to PNG', path: '/jpg-to-png', expectedTitle: 'JPG to PNG', isMulti: false, inputFiles: ['test.jpg'] },
  { name: 'PNG to JPG', path: '/png-to-jpg', expectedTitle: 'PNG to JPG', isMulti: false, inputFiles: ['test.png'] },
  { name: 'Image Compressor', path: '/image-compressor', expectedTitle: 'Image Compressor', isMulti: false, inputFiles: ['test.jpg'] },
  { name: 'PNG to WEBP', path: '/png-to-webp', expectedTitle: 'PNG to WEBP', isMulti: false, inputFiles: ['test.png'] },
  { name: 'PDF to JPG', path: '/pdf-to-jpg', expectedTitle: 'PDF to JPG', isMulti: false, inputFiles: ['test.pdf'] },
  { name: 'Compress PDF', path: '/compress-pdf', expectedTitle: 'Compress PDF', isMulti: false, inputFiles: ['test.pdf'] },
  { name: 'Image to PDF', path: '/image-to-pdf', expectedTitle: 'Image to PDF', isMulti: true, inputFiles: ['test.jpg', 'test.png'] },
];

test.describe('File Conversion Tools Full Flow', () => {
  for (const tool of activeTools) {
    test.describe(`${tool.name} Flow`, () => {
      // Increase timeout for conversion flows
      test.setTimeout(45000);

      test('should complete full upload, conversion, and download flow', async ({ page }) => {
        await page.goto(tool.path);

        // Verify tool title
        const heading = page.locator('h1').first();
        await expect(heading).toContainText(tool.expectedTitle, { ignoreCase: true });

        // Upload file(s)
        const fileInput = page.locator('input[type="file"]');
        await expect(fileInput).toBeAttached();

        const fixturesDir = path.join(__dirname, 'fixtures');
        const filePaths = tool.inputFiles.map(file => path.join(fixturesDir, file));

        await fileInput.setInputFiles(filePaths);

        // Wait for INITIATE/MERGE/CONVERT button
        const actionButton = page.locator('button', { hasText: /INITIATE|MERGE|CONVERT/i });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: `screenshot-${tool.name.replace(/\s+/g, '-')}.png`, fullPage: true });
        await expect(actionButton).toBeVisible();
        await actionButton.click();

        // Wait for RETRIEVE link indicating success (we skip checking the transient loading state to avoid race conditions)
        const retrieveLink = page.locator('a', { hasText: /RETRIEVE/i });
        await expect(retrieveLink).toBeVisible({ timeout: 20000 });

        // Verify it has a valid blob URL (download link)
        const href = await retrieveLink.getAttribute('href');
        expect(href).toMatch(/^blob:/);

        // Test the actual download event
        const downloadPromise = page.waitForEvent('download');
        // Click the retrieve link to start download
        await retrieveLink.click();
        const download = await downloadPromise;
        
        // Ensure a filename is suggested for the downloaded payload
        expect(download.suggestedFilename()).toBeTruthy();
      });
    });
  }
});
