import { type Page, type Locator, expect } from '@playwright/test';

export class ContactPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly subjectSelect: Locator;
  readonly messageTextarea: Locator;
  readonly newsletterCheckbox: Locator;
  readonly termsCheckbox: Locator;
  readonly submitButton: Locator;
  readonly resetButton: Locator;
  readonly contactForm: Locator;
  readonly successMessage: Locator;
  readonly displayName: Locator;
  readonly displayEmail: Locator;
  readonly displayPhone: Locator;
  readonly displaySubject: Locator;
  readonly displayMessage: Locator;
  readonly displayNewsletter: Locator;
  readonly newMessageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.emailInput = page.getByTestId('email');
    this.phoneInput = page.getByTestId('phone');
    this.subjectSelect = page.getByTestId('subject');
    this.messageTextarea = page.getByTestId('message');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.termsCheckbox = page.getByTestId('terms');
    this.submitButton = page.getByTestId('submit-btn');
    this.resetButton = page.getByTestId('reset-btn');
    this.contactForm = page.locator('#contactForm');
    this.successMessage = page.locator('#successMessage');
    this.displayName = page.locator('#displayName');
    this.displayEmail = page.locator('#displayEmail');
    this.displayPhone = page.locator('#displayPhone');
    this.displaySubject = page.locator('#displaySubject');
    this.displayMessage = page.locator('#displayMessage');
    this.displayNewsletter = page.locator('#displayNewsletter');
    this.newMessageButton = page.getByTestId('new-message-btn');
  }

  async goto() {
    await this.page.goto('file://' + process.cwd() + '/sample-app/form.html');
  }

  async fillForm(data: {
    firstName: string;
    lastName?: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    newsletter?: boolean;
    terms: boolean;
  }) {
    await this.firstNameInput.fill(data.firstName);
    if (data.lastName) {
      await this.lastNameInput.fill(data.lastName);
    }
    await this.emailInput.fill(data.email);
    if (data.phone) {
      await this.phoneInput.fill(data.phone);
    }
    await this.subjectSelect.selectOption(data.subject);
    await this.messageTextarea.fill(data.message);
    if (data.newsletter) {
      await this.newsletterCheckbox.check();
    }
    if (data.terms) {
      await this.termsCheckbox.check();
    }
  }

  async submit() {
    await this.submitButton.click();
  }

  async reset() {
    await this.resetButton.click();
  }

  async clickNewMessage() {
    await this.newMessageButton.click();
  }

  async expectSuccessVisible() {
    await expect(this.successMessage).toBeVisible();
  }

  async expectSuccessNotVisible() {
    await expect(this.successMessage).not.toBeVisible();
  }

  async expectFormVisible() {
    await expect(this.contactForm).toBeVisible();
  }

  async getDisplayName(): Promise<string> {
    return await this.displayName.textContent() || '';
  }

  async getDisplayEmail(): Promise<string> {
    return await this.displayEmail.textContent() || '';
  }

  async getDisplaySubject(): Promise<string> {
    return await this.displaySubject.textContent() || '';
  }

  async getDisplayMessage(): Promise<string> {
    return await this.displayMessage.textContent() || '';
  }
}
