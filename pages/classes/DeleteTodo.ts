import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { LocatorMaster} from '../locators/TodoLocators';

export class DeleteTodo extends BasePage {

  constructor(page: Page) {
    super(page);
  }
  get url(): string {
    return 'https://demo.playwright.dev/todomvc';
  }

  //Action
  async deleteTodo(index: number): Promise<void> {
    const locator = new LocatorMaster(this.page);

    // Delete first todo on top list
    const firstTodo = locator.todoItem(index);
    await firstTodo.hover();
    await firstTodo.getByRole('button', { name: 'Delete' }).click();
  }
}