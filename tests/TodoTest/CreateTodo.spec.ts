import { test, expect } from './fixtures';

test.describe('Create Todo', () => {

  test('create first todo', async ({ create, locator }) => {
    await create.goto();

    await expect(locator.headerName).toBeVisible();
    await expect(locator.fieldInput).toBeVisible();

    await create.createTodo('Todo 1');

    await expect(locator.todoItem(0)).toContainText('Todo 1');
  });
});
