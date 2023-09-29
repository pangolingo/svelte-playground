import 'dotenv/config';
import { test, expect } from '@playwright/test';

test('trying to save pokemon when logged out', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Check out all the pokemons!' }).click();
  await page.getByRole('link', { name: '#4 charmander' }).click();
  await page.getByRole('button', { name: 'Save pokemon' }).click();
  await expect(page.getByText('Please log in to save this pokemon.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Save pokemon' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Remove saved pokemon' })).not.toBeVisible();
});

test.describe('when logged in as a user', () => {
  // use logged in user state
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('saving and unsaving pokemon', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Check out all the pokemons!' }).click();
    await page.getByRole('link', { name: '#4 charmander' }).click();
    await page.getByRole('button', { name: 'Save pokemon' }).click();
    await expect(page.getByText('Saved!')).toBeVisible();

    // saved pokemon appears on the homepage and list page
    await page.goto('/');
    await expect(page.getByRole('link', { name: '❤️ #4 charmander' })).toBeVisible();
    await page.goto('/pokemon');
    await expect(page.getByRole('link', { name: '❤️ #4 charmander' })).toBeVisible();

    // unsaving
    await page.getByRole('link', { name: '❤️ #4 charmander' }).click();
    await page.getByRole('button', { name: 'Remove saved pokemon' }).click();
    await expect(page.getByText('Unsaved!')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save pokemon' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Remove saved pokemon' })).not.toBeVisible();

    // pokemon no longer appears on other pages
    await page.goto('/');
    await expect(page.getByRole('link', { name: '❤️ #4 charmander' })).not.toBeVisible();
    await page.goto('/pokemon');
    await expect(page.getByRole('link', { name: '❤️ #4 charmander' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: '#4 charmander' })).toBeVisible();
  });
});
