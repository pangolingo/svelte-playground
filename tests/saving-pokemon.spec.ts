import { test, expect } from '@playwright/test';
import { testWithAuthenticatedUser } from '../playwright/fixtures';

// importing from $env doesn't work (`Cannot find package '$env'`) for some
// import { TEST_USER_EMAIL, TEST_USER_PASSWORD } from '$env/static/private';
// we install and use dotenv instead for now
import 'dotenv/config';
const { TEST_USER_EMAIL, TEST_USER_PASSWORD } = process.env;
if (!TEST_USER_EMAIL || !TEST_USER_PASSWORD) {
	throw new Error("Could not load test user's username or password");
}

test('trying to save pokemon when logged out', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Check out all the pokemons!' }).click();
	await page.getByRole('link', { name: '#4 charmander' }).click();
	await page.getByRole('button', { name: 'Save pokemon' }).click();
	await expect(page.getByText('Please log in to save this pokemon.')).toBeVisible();
	await expect(page.getByRole('button', { name: 'Save pokemon' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Remove saved pokemon' })).not.toBeVisible();
});

// TODO: replace with saved auth
// test('saving and unsaving pokemon', async ({ page }) => {
testWithAuthenticatedUser('saving and unsaving pokemon', async ({ page }) => {
	await page.goto('/');
	// await page.getByRole('button', { name: 'Sign In with Auth0' }).click();
	// await page.getByLabel('Email address').fill(TEST_USER_EMAIL);
	// await page.getByLabel('Password').fill(TEST_USER_PASSWORD);
	// await page.getByRole('button', { name: 'Continue', exact: true }).click();
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
