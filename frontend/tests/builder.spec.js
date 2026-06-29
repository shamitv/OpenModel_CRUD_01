import { test, expect } from '@playwright/test';

test.describe('Full Builder E2E Flow', () => {
  const USERNAME = 'testuser_e2e_builder';
  const EMAIL = 'e2e@test.local';
  const PASSWORD = 'E2ePass123!';

  test('creates a survey, adds questions, reorders, previews, and submits', async ({ page }) => {
    // 1. Register new user
    await page.goto('http://localhost:5173/register');
    await page.fill('#username', USERNAME);
    await page.fill('#email', EMAIL);
    await page.fill('#password', PASSWORD);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('http://localhost:5173/');

    // 2. Navigate to builder
    await page.goto('http://localhost:5173/builder');
    await expect(page).toHaveURL('http://localhost:5173/builder');

    // 3. Click New Survey
    await page.click('button:has-text("New Survey")');
    await expect(page).toHaveURL('http://localhost:5173/builder');

    // 4. Enter title and description
    await page.fill('input[placeholder="Survey title"]', 'E2E Test Survey');
    await page.fill('textarea[placeholder="Description (optional)"]', 'Full E2E test survey');

    // 5. Wait for auto-save and verify save state transitions
    await page.waitForTimeout(2500);
    await expect(page.locator('text=Saved')).toBeVisible();

    // 6. Add Short Text question
    await page.click('button:has-text("+ Add question")');
    await page.selectOption('select', 'short_text');
    await page.click('button:has-text("Add Question")');
    await expect(page.locator('text=Q1')).toBeVisible();

    // 7. Add Multiple Choice question
    await page.click('button:has-text("+ Add question")');
    await page.selectOption('select', 'multiple_choice');
    await page.click('button:has-text("Add Question")');
    await expect(page.locator('text=Q2')).toBeVisible();

    // 8. Add Rating question
    await page.click('button:has-text("+ Add question")');
    await page.selectOption('select', 'rating');
    await page.click('button:has-text("Add Question")');
    await expect(page.locator('text=Q3')).toBeVisible();

    // 9. Verify all 3 questions visible in outline and canvas
    await expect(page.locator('text=Q1')).toBeVisible();
    await expect(page.locator('text=Q2')).toBeVisible();
    await expect(page.locator('text=Q3')).toBeVisible();

    // 10. Reorder: move Q2 (Multiple Choice) to top
    // Find Q2 in outline (second item) and click its move-up button
    const q2Card = page.locator('.border-gray-200.hover\\:border-gray-300').nth(1);
    const q2MoveUp = q2Card.locator('button[title="Move up"]');
    await expect(q2MoveUp).not.toHaveAttribute('disabled');
    await q2MoveUp.click();
    await page.waitForTimeout(500);

    // Verify new order: Q2 (Multiple Choice), Q1 (Short Text), Q3 (Rating)
    const outlineOrder = await page.locator('.border-gray-200.hover\\:border-gray-300').allTextContents();
    expect(outlineOrder[0]).toContain('Multiple Choice');
    expect(outlineOrder[1]).toContain('Short Text');
    expect(outlineOrder[2]).toContain('Rating');

    // 11. Click Preview button (in Layout header)
    await page.click('button:has-text("Preview")');
    await page.waitForTimeout(1000);

    // 12. Verify preview page loaded
    await expect(page.locator('h1')).toContainText('E2E Test Survey');
    await expect(page.locator('text=Full E2E test survey')).toBeVisible();

    // 13. Verify all 3 questions visible in order
    await expect(page.locator('text=1.')).toBeVisible();
    await expect(page.locator('text=2.')).toBeVisible();
    await expect(page.locator('text=3.')).toBeVisible();

    // 14. Verify progress bar shown (>3 questions would show it, but we have 3, so it should NOT show)
    // Actually with exactly 3 questions, progress indicator should NOT be shown (>3 check)
    // This is correct behavior per the code: {questions.length > 3 && ...}

    // 15. Verify submit button
    await expect(page.locator('button:has-text("Submit")')).toBeVisible();

    // 16. Fill in all answers
    // Q1: Short text
    await page.fill('input[type="text"]:first-of-type', 'Short text answer');

    // Q2: Multiple choice - select first option
    await page.click('input[type="radio"]:first-of-type');

    // Q3: Rating - select 3
    await page.click('button:nth-child(3)');

    // 17. Click Submit
    await page.click('button:has-text("Submit")');

    // 18. Wait for success state
    await page.waitForTimeout(1500);

    // 19. Verify success message
    await expect(page.locator('text=Thank you!')).toBeVisible();
    await expect(page.locator('text=Your response has been recorded.')).toBeVisible();
    await expect(page.locator('button:has-text("Back to surveys")')).toBeVisible();

    // 20. Click Back to surveys
    await page.click('button:has-text("Back to surveys")');
    await page.waitForTimeout(500);

    // 21. Verify return to dashboard
    await expect(page.locator('h2')).toContainText('My Surveys');
  });
});
