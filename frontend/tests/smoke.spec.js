import { test, expect } from '@playwright/test';

test.describe('App Shell', () => {
  test('loads the app', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    const title = await page.title();
    expect(title).toBe('Survey Studio');
    await expect(page.locator('h2')).toContainText('Login');
    await expect(page.locator('input[type=text]')).toBeVisible();
    await expect(page.locator('input[type=password]')).toBeVisible();
  });
});

test.describe('Survey Builder', () => {
  const USERNAME = 'testuser_builder';
  const EMAIL = 'builder@test.local';
  const PASSWORD = 'TestPass123!';

  async function registerAndLogin(page) {
    await page.goto('http://localhost:5173/register');
    await page.fill('#username', USERNAME);
    await page.fill('#email', EMAIL);
    await page.fill('#password', PASSWORD);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('http://localhost:5173/');
  }

  test('creates a survey with multiple question types', async ({ page }) => {
    await registerAndLogin(page);
    await page.goto('http://localhost:5173/builder');
    await expect(page).toHaveURL('http://localhost:5173/builder');

    // Click New Survey button
    await page.click('button:has-text("New Survey")');
    await expect(page).toHaveURL('http://localhost:5173/builder');

    // Enter title and description
    await page.fill('input[placeholder="Survey title"]', 'Test Survey');
    await page.fill('textarea[placeholder="Description (optional)"]', 'A test survey for smoke tests');

    // Wait for auto-save (2s debounce + buffer)
    await page.waitForTimeout(2500);

    // Verify "Saved" indicator
    await expect(page.locator('text=Saved')).toBeVisible();

    // Add Short Text question
    await page.click('button:has-text("+ Add question")');
    await page.selectOption('select', 'short_text');
    await page.click('button:has-text("Add Question")');
    await expect(page.locator('text=Q1')).toBeVisible();

    // Add Multiple Choice question
    await page.click('button:has-text("+ Add question")');
    await page.selectOption('select', 'multiple_choice');
    await page.click('button:has-text("Add Question")');
    await expect(page.locator('text=Q2')).toBeVisible();

    // Add Rating question
    await page.click('button:has-text("+ Add question")');
    await page.selectOption('select', 'rating');
    await page.click('button:has-text("Add Question")');
    await expect(page.locator('text=Q3')).toBeVisible();

    // Verify all 3 questions in outline
    await expect(page.locator('text=Q1')).toBeVisible();
    await expect(page.locator('text=Q2')).toBeVisible();
    await expect(page.locator('text=Q3')).toBeVisible();

    // Verify question count in outline header
    await expect(page.locator('text=3').first()).toBeVisible();
  });
});

test.describe('Reorder Questions', () => {
  const USERNAME = 'testuser_reorder';
  const EMAIL = 'reorder@test.local';
  const PASSWORD = 'TestPass123!';

  async function registerAndLogin(page) {
    await page.goto('http://localhost:5173/register');
    await page.fill('#username', USERNAME);
    await page.fill('#email', EMAIL);
    await page.fill('#password', PASSWORD);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('http://localhost:5173/');
  }

  test('moves questions up and down', async ({ page }) => {
    await registerAndLogin(page);
    await page.goto('http://localhost:5173/builder');
    await page.click('button:has-text("New Survey")');

    // Enter title
    await page.fill('input[placeholder="Survey title"]', 'Reorder Test');
    await page.fill('textarea[placeholder="Description (optional)"]', 'Testing reorder');
    await page.waitForTimeout(2500);

    // Add 3 questions
    const types = ['short_text', 'multiple_choice', 'rating'];
    for (const type of types) {
      await page.click('button:has-text("+ Add question")');
      await page.selectOption('select', type);
      await page.click('button:has-text("Add Question")');
    }

    // Verify initial order: Q1 (Short Text), Q2 (Multiple Choice), Q3 (Rating)
    const outlineOrder = await page.locator('.border-gray-200.hover\\:border-gray-300').allTextContents();
    expect(outlineOrder[0]).toContain('Short Text');
    expect(outlineOrder[1]).toContain('Multiple Choice');
    expect(outlineOrder[2]).toContain('Rating');

    // Q1 move-down should be disabled (first question)
    const q1MoveDown = page.locator('.border-gray-200.hover\\:border-gray-300').first().locator('button[title="Move down"]');
    await expect(q1MoveDown).toHaveAttribute('disabled');

    // Q2 move-down should be enabled
    const q2MoveDown = page.locator('.border-gray-200.hover\\:border-gray-300').nth(1).locator('button[title="Move down"]');
    await expect(q2MoveDown).not.toHaveAttribute('disabled');

    // Move Q2 down
    await q2MoveDown.click();
    await page.waitForTimeout(500);

    // Verify Q3 (Rating) now appears before Q2 (Multiple Choice) in outline
    const outlineOrderAfter = await page.locator('.border-gray-200.hover\\:border-gray-300').allTextContents();
    expect(outlineOrderAfter[0]).toContain('Short Text');
    expect(outlineOrderAfter[1]).toContain('Rating');
    expect(outlineOrderAfter[2]).toContain('Multiple Choice');

    // Move Q3 (Rating, now in middle) up
    const q3MoveUp = page.locator('.border-gray-200.hover\\:border-gray-300').nth(1).locator('button[title="Move up"]');
    await q3MoveUp.click();
    await page.waitForTimeout(500);

    // Verify Q3 returns to position 2
    const outlineOrderAfterUp = await page.locator('.border-gray-200.hover\\:border-gray-300').allTextContents();
    expect(outlineOrderAfterUp[0]).toContain('Short Text');
    expect(outlineOrderAfterUp[1]).toContain('Rating');
    expect(outlineOrderAfterUp[2]).toContain('Multiple Choice');

    // Q2 (Multiple Choice, last) move-up should be disabled
    const q2MoveUp = page.locator('.border-gray-200.hover\\:border-gray-300').nth(2).locator('button[title="Move up"]');
    await expect(q2MoveUp).toHaveAttribute('disabled');
  });
});

test.describe('Preview Mode', () => {
  const USERNAME = 'testuser_preview';
  const EMAIL = 'preview@test.local';
  const PASSWORD = 'TestPass123!';

  async function registerAndLogin(page) {
    await page.goto('http://localhost:5173/register');
    await page.fill('#username', USERNAME);
    await page.fill('#email', EMAIL);
    await page.fill('#password', PASSWORD);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('http://localhost:5173/');
  }

  test('shows readonly preview with progress and success state', async ({ page }) => {
    await registerAndLogin(page);
    await page.goto('http://localhost:5173/builder');
    await page.click('button:has-text("New Survey")');

    // Enter title and description
    await page.fill('input[placeholder="Survey title"]', 'Preview Test');
    await page.fill('textarea[placeholder="Description (optional)"]', 'Testing preview mode');
    await page.waitForTimeout(2500);

    // Add 4 questions (triggers progress indicator since >3)
    const types = ['short_text', 'multiple_choice', 'rating', 'long_text'];
    for (const type of types) {
      await page.click('button:has-text("+ Add question")');
      await page.selectOption('select', type);
      await page.click('button:has-text("Add Question")');
    }
    await page.waitForTimeout(2500);

    // Click Preview button (in Layout header)
    await page.click('button:has-text("Preview")');
    await page.waitForTimeout(1000);

    // Verify preview page loaded
    await expect(page.locator('h1')).toContainText('Preview Test');
    await expect(page.locator('text=A testing preview mode')).toBeVisible();

    // Verify all 4 questions are visible
    await expect(page.locator('text=1.')).toBeVisible();
    await expect(page.locator('text=2.')).toBeVisible();
    await expect(page.locator('text=3.')).toBeVisible();
    await expect(page.locator('text=4.')).toBeVisible();

    // Verify submit button
    await expect(page.locator('button:has-text("Submit")')).toBeVisible();

    // Verify progress bar is shown (>3 questions)
    await expect(page.locator('.bg-gray-200.rounded-full.h-2')).toBeVisible();

    // Fill in all answers
    // Q1: Short text
    await page.fill('input[type="text"]:first-of-type', 'My answer');

    // Q2: Multiple choice - select first option
    await page.click('input[type="radio"]:first-of-type');

    // Q3: Rating - select 4
    await page.click('button:nth-child(4)');

    // Q4: Long text
    await page.fill('textarea', 'Long answer text here');

    // Click Submit
    await page.click('button:has-text("Submit")');

    // Wait for success state (setTimeout 1000ms in handler)
    await page.waitForTimeout(1500);

    // Verify success message
    await expect(page.locator('text=Thank you!')).toBeVisible();
    await expect(page.locator('button:has-text("Back to surveys")')).toBeVisible();
  });
});
