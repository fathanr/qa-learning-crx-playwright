import { test, expect } from './fixtures';
import { CheckTodo } from '../../pages/classes/CheckTodo';

test.describe('Filter Todo', () => {

  test('filter active and completed todo', async ({ page, create, locator }) => {
    await create.goto();

    await expect(locator.headerName).toBeVisible();
    await expect(locator.fieldInput).toBeVisible();

    await create.createTodo('Todo 1');
    await create.createTodo('Todo 2');
    await create.createTodo('Todo 3');

    const check = new CheckTodo(page);
    await check.checkTodo(0);

    await locator.filterActive.click();
    await expect(locator.todoItem(0)).toContainText('Todo 2');

    await locator.filterCompleted.click();
    await expect(locator.todoItem(0)).toContainText('Todo 1');
  });
});
