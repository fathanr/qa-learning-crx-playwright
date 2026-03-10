import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberCheckbox: Locator;
  readonly loginButton: Locator;
  readonly loginForm: Locator;
  readonly welcomeMessage: Locator;
  readonly displayUsername: Locator;
  readonly displayRemember: Locator;
  readonly logoutButton: Locator;
  readonly usernameError: Locator;
  readonly passwordError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.rememberCheckbox = page.locator('#remember');
    this.loginButton = page.getByTestId('login-btn');
    this.loginForm = page.locator('#loginForm');
    this.welcomeMessage = page.locator('#welcomeMessage');
    this.displayUsername = page.locator('#displayUsername');
    this.displayRemember = page.locator('#displayRemember');
    this.logoutButton = page.getByTestId('logout-btn');
    this.usernameError = page.locator('#usernameError');
    this.passwordError = page.locator('#passwordError');
  }

  async goto() {
    await this.page.goto('http://localhost:3000/login.html');
  }

  async login(username: string, password: string, remember: boolean = false) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    if (remember) {
      await this.rememberCheckbox.check();
    }
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async expectWelcomeVisible() {
    await expect(this.welcomeMessage).toBeVisible();
  }

  async expectWelcomeNotVisible() {
    await expect(this.welcomeMessage).not.toBeVisible();
  }

  async expectErrorVisible() {
    await expect(this.usernameError).toBeVisible();
  }

  async getDisplayUsername(): Promise<string> {
    return await this.displayUsername.textContent() || '';
  }

  async getDisplayRemember(): Promise<string> {
    return await this.displayRemember.textContent() || '';
  }
}
