import { test, expect } from '@playwright/test';
import { CreateTodo } from '../../pages/classes/Create';
import { DeleteTodo } from '../../pages/classes/DeleteTodo';
import { LocatorMaster } from '../../pages/locators/TodoLocators';

test.describe('Check Todo', () => {

  test('Check first todo', async ({ page }) => {
    const deleteTodo = new DeleteTodo(page);
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

    // delete first todo on top list
    await deleteTodo.deleteTodo(0);

    // assert deleted todo not visible
    await expect(locator.todoItem(0)).not.toBeVisible();

    // wait for 3 seconds for end test
    await page.waitForTimeout(3000);
  });
})
