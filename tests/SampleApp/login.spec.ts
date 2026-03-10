import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/classes/LoginPage';

test.describe('Login Page', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `test-results/login-${Date.now()}.png` });
  });

  test('Login with valid credentials', async () => {
    await loginPage.login('admin', 'password123');
    
    await loginPage.expectWelcomeVisible();
    expect(await loginPage.getDisplayUsername()).toBe('admin');
  });

  test('Login with remember me', async () => {
    await loginPage.login('admin', 'password123', true);
    
    await loginPage.expectWelcomeVisible();
    const rememberText = await loginPage.getDisplayRemember();
    expect(rememberText).toContain('Ya');
  });

  test('Login with invalid credentials', async () => {
    await loginPage.login('wrong', 'wrongpass');
    
    await loginPage.expectErrorVisible();
    await loginPage.expectWelcomeNotVisible();
  });

  test('Login with empty credentials', async () => {
    await loginPage.login('', '');
    
    await loginPage.expectErrorVisible();
    await loginPage.expectWelcomeNotVisible();
  });

  test('Logout flow', async () => {
    await loginPage.login('admin', 'password123');
    await loginPage.expectWelcomeVisible();
    
    await loginPage.logout();
    
    await expect(loginPage.loginForm).toBeVisible();
  });

  test('Full login-logout-login flow', async () => {
    await loginPage.login('admin', 'password123');
    await loginPage.expectWelcomeVisible();
    
    await loginPage.logout();
    
    await loginPage.login('admin', 'password123', true);
    await loginPage.expectWelcomeVisible();
  });
});
