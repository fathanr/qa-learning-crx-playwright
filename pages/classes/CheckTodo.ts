import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { LocatorMaster } from '../locators/TodoLocators';

export class CheckTodo extends BasePage {

  constructor(page: Page) {
    super(page);
  }
  get url(): string {
    return 'https://demo.playwright.dev/todomvc';
  }

  //Action
  async checkTodo(index: number): Promise<void> {
    const locator = new LocatorMaster(this.page);
    // Check first todo
    await locator.todoCheckbox(index).check();
  }
}