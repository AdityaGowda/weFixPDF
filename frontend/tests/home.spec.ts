import { test, expect } from '@playwright/test';

test.describe('Home Page and Navigation', () => {
  test('should load the home page correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('File Converter');
    
    // Check that we have active tool cards
    const activeToolCards = page.locator('a.group:not(.cursor-not-allowed)');
    expect(await activeToolCards.count()).toBeGreaterThan(0);
  });

  test('active tool cards should navigate to their respective routes', async ({ page }) => {
    await page.goto('/');

    // Get the first active tool link
    const firstActiveTool = page.locator('a.group:not(.cursor-not-allowed)').first();
    const href = await firstActiveTool.getAttribute('href');
    expect(href).not.toBeNull();
    
    // Navigate and check URL
    await firstActiveTool.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
  });

  test('upcoming tool cards should be visibly disabled and lack valid hrefs', async ({ page }) => {
    await page.goto('/');
    
    const upcomingTools = page.locator('a.group.cursor-not-allowed');
    if (await upcomingTools.count() > 0) {
      const firstUpcomingTool = upcomingTools.first();
      // Ensure the disabled tool does not have a valid href destination
      const href = await firstUpcomingTool.getAttribute('href');
      expect(href).toBeNull();
    }
  });
});
