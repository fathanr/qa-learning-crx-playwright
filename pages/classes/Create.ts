import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class CreateTodo extends BasePage {

  constructor(page: Page) {
    super(page);
  }
  get url(): string {
    return 'https://demo.playwright.dev/todomvc';
  }

  //Locators
  get headerName(): Locator {
    return this.page.getByRole('heading', { name: 'todos' });
  }
  
  get fieldInput(): Locator {
    return this.page.getByRole('textbox', { name: 'What needs to be done?' });
  }

  // Todo item by index
  get todoItem(): Locator {
    return this.page.getByRole('listitem').last();
  }

  //Action
  async createTodo(todo: string): Promise<void> {
    // Click input field first
    await this.fieldInput.click();
    
    // Input todo
    await this.fieldInput.fill(todo);

    // Click enter button
    await this.fieldInput.press('Enter');
  }
}