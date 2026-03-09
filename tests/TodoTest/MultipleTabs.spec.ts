import { test, expect, TODO_URL } from './fixtures';

test.describe('Multiple Tabs', () => {

  test('todo across multiple tabs', async ({ context, create, locator }) => {
    await create.goto();

    await expect(locator.headerName).toBeVisible();
    await expect(locator.fieldInput).toBeVisible();

    await create.createTodo('Todo 1');
    await expect(locator.todoItem(0)).toContainText('Todo 1');

    const page2 = await context.newPage();
    await page2.goto(TODO_URL);

    await page2.getByRole('textbox', { name: 'What needs to be done?' }).fill('Todo 2');
    await page2.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');

    await expect(page2.getByRole('listitem').nth(1)).toContainText('Todo 2');
  });
});