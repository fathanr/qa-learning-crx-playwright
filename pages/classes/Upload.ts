import { type Page, type Locator, expect } from '@playwright/test';

export class UploadPage {
  readonly page: Page;
  readonly fileInput: Locator;
  readonly uploadArea: Locator;
  readonly uploadButton: Locator;
  readonly previewContainer: Locator;
  readonly previewGrid: Locator;
  readonly fileInfo: Locator;
  readonly errorMessage: Locator;
  readonly uploadForm: Locator;
  readonly successMessage: Locator;
  readonly uploadedImage: Locator;
  readonly uploadedFileName: Locator;
  readonly newUploadButton: Locator;
  readonly loading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fileInput = page.getByTestId('file-input');
    this.uploadArea = page.locator('#uploadArea');
    this.uploadButton = page.getByTestId('upload-btn');
    this.previewContainer = page.locator('#previewContainer');
    this.previewGrid = page.locator('#previewGrid');
    this.fileInfo = page.locator('#fileInfo');
    this.errorMessage = page.locator('#errorMessage');
    this.uploadForm = page.locator('#uploadForm');
    this.successMessage = page.locator('#successMessage');
    this.uploadedImage = page.locator('#displayImage');
    this.uploadedFileName = page.locator('#uploadedFileName');
    this.newUploadButton = page.getByTestId('new-upload-btn');
    this.loading = page.locator('#loading');
  }

  async goto() {
    await this.page.goto('file://' + process.cwd() + '/sample-app/upload.html');
  }

  async setLogin() {
    await this.page.evaluate(() => {
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('username', 'TestUser');
    });
    await this.page.reload();
  }

  async uploadImages(filePaths: string[]) {
    await this.fileInput.setInputFiles(filePaths);
  }

  async clickUpload() {
    await this.uploadButton.click();
  }

  async clickNewUpload() {
    await this.newUploadButton.click();
  }

  async expectPreviewVisible() {
    await expect(this.previewContainer).toBeVisible();
  }

  async expectSuccessVisible() {
    await expect(this.successMessage).toBeVisible();
  }

  async expectUploadButtonEnabled() {
    await expect(this.uploadButton).toBeEnabled();
  }

  async expectUploadButtonDisabled() {
    await expect(this.uploadButton).toBeDisabled();
  }

  async getFileInfo(): Promise<string> {
    return await this.fileInfo.textContent() || '';
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  async expectErrorVisible() {
    await expect(this.errorMessage).toBeVisible();
  }
}
