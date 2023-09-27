import { test, expect } from '@playwright/test';

import 'dotenv/config';
const { TEST_USER_EMAIL, TEST_USER_PASSWORD } = process.env;
if (!TEST_USER_EMAIL || !TEST_USER_PASSWORD) {
  throw new Error("Could not load test user's username or password");
}

test('Logging in and logging out', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Sign In with Auth0' }).click();
  await page.getByLabel('Email address').fill(TEST_USER_EMAIL);
  await page.getByLabel('Password').fill(TEST_USER_PASSWORD);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();

  await expect(page.getByText('Logged in: tester@example.com')).toBeVisible();

  await page.getByRole('button', { name: 'Sign out' }).click();
  await expect(page.getByText('Logged in: tester@example.com')).not.toBeVisible();
  await expect(page.getByText('Logged out')).toBeVisible();
});
