import { expect, test } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';

test('signup', async ({ page }) => {
  const username = `playwright-${uuidv4()}`;

  await page.goto('http://localhost:3000/signup');
  await page.locator('input[name="firstName"]').fill(username);
  await page.locator('input[name="lastName"]').fill('Smith');
  await page.locator('input[name="email"]').fill(`${username}@example.com`);
  await page.locator('input[name="password"]').fill('12345');
  await page.locator('input[name="school"]').fill('SMU');
  await page.locator('input[autocomplete="tel-local"]').fill('91234567');
  await page.getByRole('button', { name: 'Sign up' }).click();

  await expect(page).toHaveURL('http://localhost:3000/home');
  await expect(page.locator('h1')).toHaveText(
    'Discover Causes (Courses) That Matter To You'
  );
});
