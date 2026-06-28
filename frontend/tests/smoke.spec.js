import { test, expect } from '@playwright/test';

test.describe('App Shell', () => {
  test('loads the app', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    // Check that the page title is correct
    const title = await page.title();
    expect(title).toBe('Survey Studio');
    // Check that the login heading is present
    await expect(page.locator('h2')).toContainText('Login');
    // Check that the username field is present
    await expect(page.locator('input[type=text]')).toBeVisible();
    // Check that the password field is present
    await expect(page.locator('input[type=password]')).toBeVisible();
  });
});
