import { expect, test } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid';

test('signup', async ({ page }) => {
  const username = `playwright-${uuidv4()}`;

  await page.goto('/signup');
  await page.locator('input[name="firstName"]').fill(username);
  await page.locator('input[name="lastName"]').fill('Smith');
  await page.locator('input[name="email"]').fill(`${username}@example.com`);
  await page.locator('input[name="password"]').fill('12345');
  await page.locator('input[name="school"]').fill('SMU');
  await page.locator('input[autocomplete="tel-local"]').fill('91234567');
  await page.getByRole('button', { name: 'Sign up' }).click();

  await page.waitForTimeout(1000);

  await expect(page).toHaveURL('/signup');
  await expect(page.locator('h4')).toHaveText('Verify your account');
});
