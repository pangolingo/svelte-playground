import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1, name: 'Pokeland' })).toBeVisible();
});

test('pokemon page lists pokemon', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Check out all the pokemons!' }).click();

	const pokemonList = page.getByRole('list');
	const pokemonListItems = pokemonList.getByRole('link');
	await expect(pokemonListItems).toHaveCount(20);
	await expect(pokemonListItems.nth(0)).toContainText('#1 BULBASAUR', { ignoreCase: true });
	await expect(pokemonListItems.nth(19)).toContainText('#20 RATICATE', { ignoreCase: true });
});

test('pokemon details page shows details', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Check out all the pokemons!' }).click();
	await page.getByRole('link', { name: '#1 BULBASAUR' }).click();

	await expect(page.getByRole('heading', { name: 'BULBASAUR' })).toBeVisible();
});

// PLAYWRIGHT TESTS
// header
//  nav
//  site title
// every page
//  page title
//  headlines
// home
//  nothing special
// pokemon list
//  shows pokemon
//  pagination back/forward
//  pokemon page number and count
// pokemon details
//  name
//  abilities
//  picture
// about
//  pika button
//  contact link
// contact
//  submitting form - success
//  submitting form errors
//    long message
//    require name, email, message
//    red/green checks
//    checkboxes are required
//  ?? saved data in DB (logged in and logged out)
// auth
//  log in
//  log out
//  show username in header
// favoriting
//  favoriting - logged in
//  favoriting - logged out
//  favorites in paginated list
//  favorites on home page (with links)

// form
// change to favorite starter pokemons
