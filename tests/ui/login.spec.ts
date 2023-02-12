import { expect, test } from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.locator('input[name="email"]').fill('byte@bims.com');
  await page.locator('input[name="password"]').fill('bytelovesbims');
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page).toHaveURL('http://localhost:3000/home');
  await expect(page.locator('h1')).toHaveText(
    'Discover Causes (Courses) That Matter To You'
  );
});
