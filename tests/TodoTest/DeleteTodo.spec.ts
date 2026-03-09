import { test, expect } from './fixtures';
import { DeleteTodo } from '../../pages/classes/DeleteTodo';

test.describe('Delete Todo', () => {

  test('delete first todo', async ({ page, create, locator }) => {
    await create.goto();

    await expect(locator.headerName).toBeVisible();
    await expect(locator.fieldInput).toBeVisible();

    await create.createTodo('Todo 1');
    await expect(locator.todoItem(0)).toContainText('Todo 1');

    const deleteTodo = new DeleteTodo(page);
    await deleteTodo.deleteTodo(0);

    await expect(locator.todoItem(0)).not.toBeVisible();
  });
});
