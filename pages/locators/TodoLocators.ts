import { Page, Locator } from '@playwright/test';

export class LocatorMaster {
    protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Locators
  get headerName(): Locator {
    return this.page.getByRole('heading', { name: 'todos' });
  }
  
  get fieldInput(): Locator {
    return this.page.getByRole('textbox', { name: 'What needs to be done?' });
  }

  get deleteButton(): Locator {
    return this.page.getByRole('button', { name: 'Delete' }); 
  }

  get filterAll(): Locator {
    return this.page.getByRole('link', { name: 'All' });
  }

  get filterActive(): Locator {
    return this.page.getByRole('link', { name: 'Active' });
  }

  get filterCompleted(): Locator {
    return this.page.getByRole('link', { name: 'Completed' });
  }

  // Todo item by index
todoItem(index: number): Locator {
  return this.page.getByRole('listitem').nth(index);
}

// Checkbox by index
todoCheckbox(index: number): Locator {
  return this.todoItem(index).getByRole('checkbox');
  }

}
