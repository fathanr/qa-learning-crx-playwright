import { test, expect } from '@playwright/test';
import { ContactPage } from '../../pages/classes/ContactPage';

test.describe('Contact Page', () => {

  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.goto();
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `test-results/contact-${Date.now()}.png` });
  });

  test('Submit form with valid data', async () => {
    await contactPage.fillForm({
      firstName: '',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+62 812 3456 7890',
      subject: 'pertanyaan',
      message: 'This is a test message for the contact form',
      newsletter: true,
      terms: true
    });
    await contactPage.submit();

    await contactPage.expectSuccessVisible();
    expect(await contactPage.getDisplayName()).toBe('John Doe');
    expect(await contactPage.getDisplayEmail()).toBe('john@example.com');
    expect(await contactPage.getDisplaySubject()).toBe('Pertanyaan');
  });

  test('Submit form with required fields only', async () => {
    await contactPage.fillForm({
      firstName: 'Jane',
      email: 'jane@example.com',
      subject: 'saran',
      message: 'This is another test message',
      terms: true
    });
    await contactPage.submit();

    await contactPage.expectSuccessVisible();
  });

  test('Submit form without accepting terms', async () => {
    await contactPage.fillForm({
      firstName: 'John',
      email: 'john@example.com',
      subject: 'pertanyaan',
      message: 'This is a test message for the contact form',
      terms: false
    });
    
    await contactPage.submit();

    await contactPage.expectSuccessNotVisible();
  });

  test('Reset form', async () => {
    await contactPage.fillForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      subject: 'pertanyaan',
      message: 'This is a test message',
      terms: true
    });
    
    await contactPage.reset();
    
    await expect(contactPage.firstNameInput).toBeEmpty();
    await expect(contactPage.lastNameInput).toBeEmpty();
    await expect(contactPage.emailInput).toBeEmpty();
  });

  test('New message button resets form', async () => {
    await contactPage.fillForm({
      firstName: 'John',
      email: 'john@example.com',
      subject: 'pertanyaan',
      message: 'This is a test message',
      terms: true
    });
    await contactPage.submit();

    await contactPage.expectSuccessVisible();

    await contactPage.clickNewMessage();

    await contactPage.expectFormVisible();
    await contactPage.expectSuccessNotVisible();
  });

  test('Form validation - empty first name', async () => {
    await contactPage.fillForm({
      firstName: '',
      email: 'john@example.com',
      subject: 'pertanyaan',
      message: 'This is a test message',
      terms: true
    });
    await contactPage.submit();

    await contactPage.expectSuccessNotVisible();
  });

  test('Form validation - invalid email', async () => {
    await contactPage.fillForm({
      firstName: 'John',
      email: 'invalid-email',
      subject: 'pertanyaan',
      message: 'This is a test message',
      terms: true
    });
    await contactPage.submit();

    await contactPage.expectSuccessNotVisible();
  });

  test('Form validation - message too short', async () => {
    await contactPage.fillForm({
      firstName: 'John',
      email: 'john@example.com',
      subject: 'pertanyaan',
      message: 'Short',
      terms: true
    });
    await contactPage.submit();

    await contactPage.expectSuccessNotVisible();
  });
});
