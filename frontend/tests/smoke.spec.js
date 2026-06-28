import { test, expect } from '@playwright/test';

test.describe('App Shell', () => {
  test('loads the app', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.locator('h1')).toContainText('Survey Studio');
  });
});
