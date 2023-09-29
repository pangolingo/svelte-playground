import { test, expect } from '@playwright/test';

test('pokemon details page shows details', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Check out all the pokemons!' }).click();
  await page.getByRole('link', { name: '#1 BULBASAUR' }).click();

  await expect(page.getByRole('heading', { name: 'BULBASAUR' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'the pokemon sprite from the game' })).toBeVisible();

  const pokemonList = page.getByRole('list').filter({ has: page.getByText('overgrow') });
  const pokemonListItems = pokemonList.getByRole('listitem');

  await expect(page.getByRole('heading', { name: 'Abilities' })).toBeVisible();
  await expect(pokemonListItems).toHaveText(['overgrow', 'chlorophyll']);
});
