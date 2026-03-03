import { test, expect } from '@playwright/test';
import { loginPage, formPage } from '../../fixtures/paths';
import { testData } from '../../fixtures/test-data';

test.describe('Assertions - Learn by Example', () => {

  test('1. toBeVisible() - Element visible', async ({ page }) => {
    await page.goto(loginPage);
    
    // Button should be visible
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Hidden element should not be visible
    await expect(page.locator('#welcomeMessage')).not.toBeVisible();
  });

  test('2. toBeHidden() - Element hidden', async ({ page }) => {
    await page.goto(loginPage);
    
    // Welcome message should be hidden initially
    await expect(page.locator('#welcomeMessage')).toBeHidden();
    
    // After login, form should be hidden
    await page.fill('#username', testData.login.valid.username);
    await page.fill('#password', testData.login.valid.password);
    await page.click('button[type="submit"]');
    
    await expect(page.locator('#loginForm')).toBeHidden();
  });

  test('3. toHaveText() - Exact text match', async ({ page }) => {
    await page.goto(loginPage);
    
    // Check heading text
    await expect(page.locator('h1')).toHaveText('Welcome Back');
  });

  test('4. toContainText() - Partial text match', async ({ page }) => {
    await page.goto(loginPage);
    
    // Subtitle contains text
    await expect(page.locator('.subtitle')).toContainText('login');
  });

  test('5. toHaveValue() - Input value', async ({ page }) => {
    await page.goto(loginPage);
    
    // Fill and check value
    await page.fill('#username', testData.login.valid.username);
    await expect(page.locator('#username')).toHaveValue(testData.login.valid.username);
  });

  test('6. toBeChecked() - Checkbox checked', async ({ page }) => {
    await page.goto(loginPage);
    
    // Initially not checked
    await expect(page.locator('#remember')).not.toBeChecked();
    
    // Check it
    await page.check('#remember');
    await expect(page.locator('#remember')).toBeChecked();
  });

  test('7. toHaveAttribute() - Element attribute', async ({ page }) => {
    await page.goto(loginPage);
    
    // Check input has placeholder
    await expect(page.locator('#username')).toHaveAttribute('placeholder', /username/);
    
    // Check button type
    await expect(page.locator('button[type="submit"]')).toHaveAttribute('type', 'submit');
  });

  test('8. toHaveCount() - Number of elements', async ({ page }) => {
    await page.goto(formPage);
    
    // Check form groups count
    const inputs = page.locator('.form-group input, .form-group select, .form-group textarea');
    const count = await inputs.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('9. toHaveURL() - Page URL', async ({ page }) => {
    await page.goto(loginPage);
    
    // Check URL contains filename
    await expect(page).toHaveURL(/login\.html/);
  });

  test('10. toHaveTitle() - Page title', async ({ page }) => {
    await page.goto(loginPage);
    await expect(page).toHaveTitle('Login Form - Practice App');
  });

  test('11. toBeEnabled() / toBeDisabled()', async ({ page }) => {
    await page.goto(loginPage);
    
    // Button should be enabled
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
  });

  test('12. toHaveClass() - Element classes', async ({ page }) => {
    await page.goto(loginPage);
    
    // Add error class using evaluate
    await page.locator('#username').evaluate(el => el.classList.add('error'));
    
    // Check class
    await expect(page.locator('#username')).toHaveClass(/error/);
  });

  test('13. toMatchRegex() - Regex matching', async ({ page }) => {
    await page.goto(loginPage);
    
    // Match title with regex
    await expect(page).toHaveTitle(/Login/);
  });

  test('14. Negative assertions', async ({ page }) => {
    await page.goto(loginPage);
    
    // Should NOT have error class initially
    await expect(page.locator('#username')).not.toHaveClass(/error/);
    
    // Should NOT be visible
    await expect(page.locator('#welcomeMessage')).not.toBeVisible();
  });

  test('15. Complex form validation flow', async ({ page }) => {
    await page.goto(formPage);
    
    // Submit empty form (just fill name)
    await page.fill('#firstName', testData.contactForm.valid.firstName);
    await page.check('#terms');
    await page.click('[data-testid="submit-btn"]');
    
    // Check error messages appear (email, subject, message)
    await expect(page.locator('#emailError')).toBeVisible();
    await expect(page.locator('#subjectError')).toBeVisible();
    await expect(page.locator('#messageError')).toBeVisible();
    
    // Fill valid data
    await page.fill('#email', testData.contactForm.valid.email);
    await page.selectOption('#subject', testData.contactForm.valid.subject);
    await page.fill('#message', testData.contactForm.valid.message);
    
    // Submit form
    await page.click('[data-testid="submit-btn"]');
    
    // Success message should show
    await expect(page.locator('#successMessage')).toBeVisible();
    await expect(page.locator('#displayName')).toHaveText(testData.contactForm.valid.firstName);
  });

});
