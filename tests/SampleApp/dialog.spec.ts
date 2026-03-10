import { test, expect } from '@playwright/test';
import { ContactPage } from '../../pages/classes/ContactPage';

test.describe('Browser Dialog Handling', () => {

  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.goto();
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `test-results/contact-${Date.now()}.png` });
  });

  test('should handle alert dialog when terms checkbox is not checked', async ({ page }) => {
    await contactPage.fillForm({
      firstName: 'John',
      email: 'john@example.com',
      subject: 'pertanyaan',
      message: 'This is a test message for the contact form',
      terms: false
    });

    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('Anda harus setuju dengan syarat & ketentuan');
      await page.waitForTimeout(3000);
      await dialog.dismiss();
    });

    await contactPage.submit();

  });

  test('should handle alert dialog and allow submission after checking terms', async ({ page }) => {
    await contactPage.fillForm({
      firstName: 'John',
      email: 'john@example.com',
      subject: 'pertanyaan',
      message: 'This is a test message for the contact form',
      terms: false
    });

    let dialogAppeared = false;
    page.on('dialog', async dialog => {
      dialogAppeared = true;
      expect(dialog.message()).toBe('Anda harus setuju dengan syarat & ketentuan');
      await page.waitForTimeout(3000);
      await dialog.dismiss();
    });

    await contactPage.submit();
    expect(dialogAppeared).toBe(true);

    await contactPage.termsCheckbox.check();
    await page.waitForTimeout(3000);
    await contactPage.submit();

    await contactPage.expectSuccessVisible();
  });
});
