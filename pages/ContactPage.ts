import { type Locator, type Page } from '@playwright/test';

export class ContactPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly form: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.phoneInput = page.locator('#phone');
    this.messageInput = page.locator('#message');
    this.submitButton = page.locator('button[type="submit"]');
    this.successMessage = page.locator('#successMessage');
    this.form = page.locator('#contactForm');
  }

  async loadApp(appPath: string): Promise<void> {
    await this.page.goto(`file://${appPath}`);
  }

  async fillForm(data: { name: string; email: string; phone: string; message?: string }): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
    if (data.message) {
      await this.messageInput.fill(data.message);
    }
  }

  async clearForm(): Promise<void> {
    await this.nameInput.clear();
    await this.emailInput.clear();
    await this.phoneInput.clear();
    await this.messageInput.clear();
  }

  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  async getSavedProfile(): Promise<{ name: string; email: string; phone: string } | null> {
    return this.page.evaluate(() => {
      const data = localStorage.getItem('formProfile');
      return data ? JSON.parse(data) : null;
    });
  }

  async setProfileInLocalStorage(profile: { name: string; email: string; phone: string }): Promise<void> {
    await this.page.evaluate((p) => {
      localStorage.setItem('formProfile', JSON.stringify(p));
    }, profile);
  }

  async reloadPage(): Promise<void> {
    await this.page.reload();
  }

  async waitForSuccessMessage(): Promise<void> {
    await this.successMessage.waitFor({ state: 'visible' });
  }

  async getFieldValue(field: 'name' | 'email' | 'phone' | 'message'): Promise<string> {
    switch (field) {
      case 'name':
        return this.nameInput.inputValue();
      case 'email':
        return this.emailInput.inputValue();
      case 'phone':
        return this.phoneInput.inputValue();
      case 'message':
        return this.messageInput.inputValue();
    }
  }

  async isFieldEmpty(field: 'name' | 'email' | 'phone' | 'message'): Promise<boolean> {
    const value = await this.getFieldValue(field);
    return value === '';
  }
}
