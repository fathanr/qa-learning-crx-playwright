import { test, expect } from '@playwright/test';
import { loginPage, formPage } from '../../fixtures/paths';

test.describe('Basic Actions - Learn by Example', () => {

  test('1. Navigate to page', async ({ page }) => {
    await page.goto(loginPage);
    await expect(page).toHaveTitle(/Login Form/);
  });

  test('2. Fill input field', async ({ page }) => {
    await page.goto(loginPage);
    await page.fill('#username', 'admin');
    await page.fill('#password', 'password123');
    
    await expect(page.locator('#username')).toHaveValue('admin');
    await expect(page.locator('#password')).toHaveValue('password123');
  });

  test('3. Click button', async ({ page }) => {
    await page.goto(loginPage);
    
    // Fill valid credentials
    await page.fill('#username', 'admin');
    await page.fill('#password', 'password123');
    await page.check('#remember');
    
    // Click login button
    await page.click('button[type="submit"]');
    
    // Wait for success
    await expect(page.locator('#welcomeMessage')).toBeVisible();
  });

  test('4. Check/Uncheck checkbox', async ({ page }) => {
    await page.goto(loginPage);
    
    // Check checkbox
    await page.check('#remember');
    await expect(page.locator('#remember')).toBeChecked();
    
    // Uncheck checkbox
    await page.uncheck('#remember');
    await expect(page.locator('#remember')).not.toBeChecked();
  });

  test('5. Select dropdown option', async ({ page }) => {
    await page.goto(formPage);
    
    // Select option by value
    await page.selectOption('#subject', 'pertanyaan');
    await expect(page.locator('#subject')).toHaveValue('pertanyaan');
    
    // Select option by label
    await page.selectOption('#subject', { label: 'Keluhan' });
    await expect(page.locator('#subject')).toHaveValue('keluhan');
  });

  test('6. Hover over element', async ({ page }) => {
    await page.goto(loginPage);
    
    // Hover (note: our login.html doesn't have hover effects, but this shows the syntax)
    await page.hover('button[type="submit"]');
    
    // Button should still be visible
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('7. Press keyboard keys', async ({ page }) => {
    await page.goto(formPage);
    
    // Type in textarea
    await page.fill('#message', 'Hello');
    await page.press('#message', 'End');
    await page.keyboard.press('!');
    
    // Note: pressing End might not work as expected in all cases
    await expect(page.locator('#message')).toHaveValue('Hello!');
  });

  test('8. Multiple pages/tabs', async ({ page, context }) => {
    await page.goto(loginPage);
    
    // Open new tab
    const page2 = await context.newPage();
    await page2.goto(formPage);
    
    // Both pages should be accessible
    await expect(page).toHaveTitle(/Login Form/);
    await expect(page2).toHaveTitle(/Contact Form/);
    
    await page2.close();
  });

  test('9. Wait for navigation', async ({ page }) => {
    await page.goto(loginPage);
    
    // Click link that might navigate (in our case, shows alert)
    page.on('dialog', dialog => dialog.dismiss());
    await page.click('a[data-testid="forgot-password"]');
  });

  test('10. Get text content', async ({ page }) => {
    await page.goto(loginPage);
    
    // Fill and submit
    await page.fill('#username', 'admin');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');
    
    // Get text
    const usernameText = await page.locator('#displayUsername').textContent();
    expect(usernameText).toBe('admin');
  });

});
