import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { LocatorMaster } from '../locators/TodoLocators';

export class CreateTodo extends BasePage {

  constructor(page: Page) {
    super(page);
  }
  get url(): string {
    return 'https://demo.playwright.dev/todomvc';
  }

  //Action
  async createTodo(todo: string): Promise<void> {
    const locator = new LocatorMaster(this.page);
    // Click input field first
    await locator.fieldInput.click();
    
    // Input todo
    await locator.fieldInput.fill(todo);

    // Click enter button
    await locator.fieldInput.press('Enter');
  }
}