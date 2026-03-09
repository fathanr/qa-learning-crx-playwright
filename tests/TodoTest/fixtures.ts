import { test as base, Page } from '@playwright/test';
import { CreateTodo } from '../../pages/classes/Create';
import { LocatorMaster } from '../../pages/locators/TodoLocators';

export const TODO_URL = 'https://demo.playwright.dev/todomvc';

interface TodoFixtures {
  create: CreateTodo;
  locator: LocatorMaster;
}

export const test = base.extend<TodoFixtures>({
  create: async ({ page }: { page: Page }, use: (value: CreateTodo) => Promise<void>) => {
    const create = new CreateTodo(page);
    await use(create);
  },
  locator: async ({ page }: { page: Page }, use: (value: LocatorMaster) => Promise<void>) => {
    const locator = new LocatorMaster(page);
    await use(locator);
  },
});

export { expect } from '@playwright/test';
