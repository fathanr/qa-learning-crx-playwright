import { test, expect } from '@playwright/test';

test('run first test with assertion', async ({ page }) => {
    //Go to link website
  await page.goto('https://the-internet.herokuapp.com/login');
  // assertion web page has Login Page Title
  await expect(page).toHaveTitle('The Internet');
  // Input username
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  // Input password
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  // Klik tombol Login
  await page.getByRole('button', { name: 'Login' }).click();

  //assertion warning message success login
  await expect(page.locator('#flash')).toContainText('You logged into a secure area');

  //assertion element log out
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});