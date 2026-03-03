import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {

  test('should load the home page with main heading', async ({ page }) => {
    await page.goto('/');

    // Check main heading exists
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('File Converter', { ignoreCase: true });
  });

  test('should display all tool cards as active (no "Coming Soon")', async ({ page }) => {
    await page.goto('/');

    // All tool cards should be clickable (active)
    const activeToolCards = page.locator('a.group');
    const count = await activeToolCards.count();
    expect(count).toBeGreaterThanOrEqual(10);

    // No disabled/upcoming tools
    const disabledCards = page.locator('a.group.cursor-not-allowed');
    expect(await disabledCards.count()).toBe(0);

    // No "Coming Soon" badges
    const comingSoon = page.locator('text=Coming Soon');
    expect(await comingSoon.count()).toBe(0);
  });

  test('every tool card should have a valid href', async ({ page }) => {
    await page.goto('/');

    const toolCards = page.locator('a.group');
    const count = await toolCards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const href = await toolCards.nth(i).getAttribute('href');
      expect(href).not.toBeNull();
      expect(href).toMatch(/^\//); // starts with /
    }
  });

  test('clicking a tool card navigates to the tool page', async ({ page }) => {
    await page.goto('/');

    const firstActiveTool = page.locator('a.group').first();
    const href = await firstActiveTool.getAttribute('href');
    expect(href).not.toBeNull();

    await firstActiveTool.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
  });

  test('should include all new tools on homepage', async ({ page }) => {
    await page.goto('/');

    const body = await page.textContent('body');
    const requiredTools = ['Merge PDF', 'Split PDF', 'PDF to Word', 'HEIC to JPG', 'Compress PDF', 'PDF to JPG'];

    for (const tool of requiredTools) {
      expect(body).toContain(tool);
    }
  });
});
