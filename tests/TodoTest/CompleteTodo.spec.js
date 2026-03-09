import { test, expect } from '@playwright/test';
import { CreateTodo } from '../../pages/classes/Create';
import { CheckTodo } from '../../pages/classes/CheckTodo';
import { LocatorMaster } from '../../pages/locators/TodoLocators';

test.describe('Check Todo', () => {

  test('Check first todo', async ({ page }) => {
    const check = new CheckTodo(page);
    const create = new CreateTodo(page);
    const locator = new LocatorMaster(page);
    // navigate to URL
    await create.goto();

    // after navigate to URL wait for 3 seconds
    await page.waitForTimeout(3000);

    // assert the components on web
    await expect(locator.headerName).toContainText('todos');
    await expect(locator.fieldInput).toBeVisible();

    // input todo
    await create.createTodo('Todo 1');

    // after input the todo please wait for 3 seconds
    await page.waitForTimeout(3000);

    // assert inputed todo
    await expect(locator.todoItem(0)).toContainText('Todo 1');

    // check first top todo
    await check.checkTodo(0);

    // assert todo already checked
    await expect(locator.todoCheckbox(0)).toBeChecked();

    // wait for 3 seconds for end test
    await page.waitForTimeout(3000);
  });
})
