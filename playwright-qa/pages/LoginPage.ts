import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberCheckbox: Locator;
  readonly loginButton: Locator;
  readonly welcomeMessage: Locator;
  readonly logoutButton: Locator;
  readonly usernameError: Locator;
  readonly passwordError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.rememberCheckbox = page.locator('#remember');
    this.loginButton = page.locator('button[type="submit"]');
    this.welcomeMessage = page.locator('#welcomeMessage');
    this.logoutButton = page.locator('#logoutBtn');
    this.usernameError = page.locator('#usernameError');
    this.passwordError = page.locator('#passwordError');
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async login(username: string, password: string, remember: boolean = false) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    
    if (remember) {
      await this.rememberCheckbox.check();
    }
    
    await this.loginButton.click();
  }

  async expectWelcomeVisible() {
    await expect(this.welcomeMessage).toBeVisible();
  }

  async expectWelcomeNotVisible() {
    await expect(this.welcomeMessage).not.toBeVisible();
  }

  async getDisplayUsername(): Promise<string> {
    return await this.page.locator('#displayUsername').textContent() ?? '';
  }

  async logout() {
    await this.logoutButton.click();
  }

  async expectErrorVisible() {
    await expect(this.usernameError).toBeVisible();
  }
}
