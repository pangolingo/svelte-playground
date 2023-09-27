import { test, expect } from '@playwright/test';

test('index page has a headline', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Welcome to Pokeland' })).toBeVisible();
});

test('the homepage links to the pokemon list', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Check out all the pokemons!' }).click();
  await expect(page.getByRole('heading', { name: '1292 pokemon (page 1)' })).toBeVisible();
});
