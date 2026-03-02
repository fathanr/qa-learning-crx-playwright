import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginPage } from '../../fixtures/paths';

test.describe('Page Object Model - Learn by Example', () => {

  let loginPageObj: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPageObj = new LoginPage(page);
    await loginPageObj.goto(loginPage);
  });

  test('1. Login with valid credentials', async () => {
    await loginPageObj.login('admin', 'password123');
    
    await loginPageObj.expectWelcomeVisible();
    expect(await loginPageObj.getDisplayUsername()).toBe('admin');
  });

  test('2. Login with remember me', async () => {
    await loginPageObj.login('admin', 'password123', true);
    
    await loginPageObj.expectWelcomeVisible();
    const rememberText = await loginPageObj.page.locator('#displayRemember').textContent();
    expect(rememberText).toContain('Ya');
  });

  test('3. Login with invalid credentials', async () => {
    await loginPageObj.login('wrong', 'wrongpass');
    
    await loginPageObj.expectErrorVisible();
    await loginPageObj.expectWelcomeNotVisible();
  });

  test('4. Login with empty credentials', async () => {
    await loginPageObj.login('', '');
    
    await loginPageObj.expectErrorVisible();
    await loginPageObj.expectWelcomeNotVisible();
  });

  test('5. Logout flow', async () => {
    // Login first
    await loginPageObj.login('admin', 'password123');
    await loginPageObj.expectWelcomeVisible();
    
    // Logout
    await loginPageObj.logout();
    
    // Should be back to login form
    await expect(loginPageObj.page.locator('#loginForm')).toBeVisible();
  });

  test('6. Full login-logout-login flow', async () => {
    // First login
    await loginPageObj.login('admin', 'password123');
    await loginPageObj.expectWelcomeVisible();
    
    // Logout
    await loginPageObj.logout();
    
    // Login again with different remember option
    await loginPageObj.login('admin', 'password123', true);
    await loginPageObj.expectWelcomeVisible();
  });

});
