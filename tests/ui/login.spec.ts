import { expect, Page, test } from '@playwright/test';

async function volunteer_login(page: Page, username: string, password: string) {
  await page.goto('/login');
  await page.locator('input[name="email"]').fill(username);
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page).toHaveURL('/discover-courses');
  await expect(page.locator('h3')).toHaveText(
    'Discover Causes (Courses) That Matter To You'
  );
}

async function sa_or_cm_login(page: Page, username: string, password: string) {
  await page.goto('/login');
  await page.locator('input[name="email"]').fill(username);
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page).toHaveURL('/manage/users');
  await expect(page.locator('h3')).toHaveText('Users');
}

test.describe('login', () => {
  test('system admin', async ({ page }) => {
    await sa_or_cm_login(page, 'byte@bims.com', 'bytelovesbims');
  });

  test('committee member', async ({ page }) => {
    await sa_or_cm_login(page, 'jessica@bims.com', 'jessicaloveshamsters');
  });

  test('volunteer', async ({ page }) => {
    await volunteer_login(page, 'emily@bims.com', 'emilyinbims');
  });
});
