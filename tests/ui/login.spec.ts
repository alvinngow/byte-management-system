import { expect, Page, test } from '@playwright/test';

async function login(page: Page, username: string, password: string) {
  await page.goto('http://localhost:3000/login');
  await page.locator('input[name="email"]').fill(username);
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page).toHaveURL('http://localhost:3000/home');
  await expect(page.locator('h1')).toHaveText(
    'Discover Causes (Courses) That Matter To You'
  );
}

test.describe('login', () => {
  test('system admin', async ({ page }) => {
    await login(page, 'byte@bims.com', 'bytelovesbims');
  });

  test('committee member', async ({ page }) => {
    await login(page, 'jessica@bims.com', 'jessicaloveshamsters');
  });

  test('volunteer', async ({ page }) => {
    await login(page, 'emily@bims.com', 'emilyinbims');
  });
});
