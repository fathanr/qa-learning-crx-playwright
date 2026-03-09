import { test, expect } from './fixtures';
import { CheckTodo } from '../../pages/classes/CheckTodo';

test.describe('Check Todo', () => {

  test('check first todo', async ({ page, create, locator }) => {
    await create.goto();

    await expect(locator.headerName).toBeVisible();
    await expect(locator.fieldInput).toBeVisible();

    await create.createTodo('Todo 1');
    await expect(locator.todoItem(0)).toContainText('Todo 1');

    const check = new CheckTodo(page);
    await check.checkTodo(0);

    await expect(locator.todoCheckbox(0)).toBeChecked();
  });
});
