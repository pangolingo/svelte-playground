import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'About' }).click();

	await expect(page.getByRole('heading', { name: 'About Pokeland' })).toBeVisible();

	page.once('dialog', (dialog) => {
		expect(dialog.message()).toEqual('PIKA PIKA!');
		dialog.dismiss().catch(() => {});
	});
	await page.getByRole('button', { name: 'PIKA!' }).click();

	await page.getByRole('link', { name: 'Tell me you like this site' }).click();
	await expect(page.getByRole('heading', { name: 'Contact me' })).toBeVisible();
});
