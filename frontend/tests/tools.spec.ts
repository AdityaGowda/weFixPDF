import { test, expect } from '@playwright/test';

// Define the active tool routes to test dynamically
const activeTools = [
  { name: 'JPG to PNG', path: '/jpg-to-png', expectedTitle: 'JPG to PNG' },
  { name: 'PNG to JPG', path: '/png-to-jpg', expectedTitle: 'PNG to JPG' },
  { name: 'Image Compressor', path: '/image-compressor', expectedTitle: 'Compress Image' },
  { name: 'PNG to WEBP', path: '/png-to-webp', expectedTitle: 'PNG to WEBP' },
];

test.describe('File Conversion Tools', () => {
  for (const tool of activeTools) {
    test.describe(`${tool.name} Page`, () => {
      test('should render tool title and upload component', async ({ page }) => {
        await page.goto(tool.path);

        // Check page contains specific expected title in heading or hero
        const heading = page.locator('h1').first();
        await expect(heading).toContainText(tool.expectedTitle, { ignoreCase: true });

        // Verify upload area exists. The UploadBox component usually renders this
        const dropzone = page.locator('text=Choose File');
        await expect(dropzone.first()).toBeVisible();
      });

      test('should allow interacting with file upload input', async ({ page }) => {
        await page.goto(tool.path);
        
        // Find the hidden file input within the document
        const fileInput = page.locator('input[type="file"]');
        await expect(fileInput).toBeAttached();
      });
    });
  }
});
