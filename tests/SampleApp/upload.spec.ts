import { test, expect } from '@playwright/test';
import { UploadPage } from '../../pages/classes/Upload';
import path from 'path';

test.describe('Image Upload', () => {

  let uploadPage: UploadPage;

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.sessionStorage.setItem('isLoggedIn', 'true');
      window.sessionStorage.setItem('username', 'TestUser');
    });
    uploadPage = new UploadPage(page);
    await uploadPage.goto();
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `test-results/contact-${Date.now()}.png` });
  });

  test('should upload single image and show preview', async () => {
    const imagePath = path.join(process.cwd(), 'data-test', 'sushi-tei.jpg');
    
    await uploadPage.uploadImages([imagePath]);
    
    await uploadPage.expectPreviewVisible();
    await uploadPage.expectUploadButtonEnabled();
    expect(await uploadPage.getFileInfo()).toContain('1 file(s) dipilih');
  });

  test('should upload multiple images and show preview', async () => {
    const imagePaths = [
      path.join(process.cwd(), 'data-test', 'sushi-tei.jpg'),
      path.join(process.cwd(), 'data-test', 'ramen ya.png'),
      path.join(process.cwd(), 'data-test', 'logo mall ratu indah.png')
    ];
    
    await uploadPage.uploadImages(imagePaths);
    
    await uploadPage.expectPreviewVisible();
    await uploadPage.expectUploadButtonEnabled();
    expect(await uploadPage.getFileInfo()).toContain('3 file(s) dipilih');
  });

  test('should handle upload button click', async ({ page }) => {
    const imagePath = path.join(process.cwd(), 'data-test', 'sushi-tei.jpg');
    
    await uploadPage.uploadImages([imagePath]);
    await uploadPage.expectUploadButtonEnabled();
    
    page.on('response', response => {
      if (response.url().includes('localhost:3000')) {
        expect(response.status()).toBeGreaterThanOrEqual(400);
      }
    });

    await uploadPage.clickUpload();
    await page.waitForTimeout(1000);
  });

  test('should show error when no file selected', async () => {
    await uploadPage.expectUploadButtonDisabled();
  });
});
