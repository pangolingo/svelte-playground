import { test as baseTest, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';
const { TEST_USER_EMAIL, TEST_USER_PASSWORD } = process.env;
if (!TEST_USER_EMAIL || !TEST_USER_PASSWORD) {
	throw new Error("Could not load test user's username or password");
}

// export * from '@playwright/test';
export const testWithAuthenticatedUser = baseTest.extend<{}, { workerStorageState: string }>({
	// Use the same storage state for all tests in this worker.
	storageState: ({ workerStorageState }, use) => use(workerStorageState),

	// Authenticate once per worker with a worker-scoped fixture.
	workerStorageState: [
		async ({ browser }, use) => {
			// Use parallelIndex as a unique identifier for each worker.
			const id = testWithAuthenticatedUser.info().parallelIndex;
			const fileName = path.resolve(
				testWithAuthenticatedUser.info().project.outputDir,
				`.auth/${id}.json`
			);

			if (fs.existsSync(fileName)) {
				// Reuse existing authentication state if any.
				await use(fileName);
				return;
			}

			// Important: make sure we authenticate in a clean environment by unsetting storage state.
			const page = await browser.newPage({ storageState: undefined });

			// Acquire a unique account, for example create a new one.
			// Alternatively, you can have a list of precreated accounts for testing.
			// Make sure that accounts are unique, so that multiple team members
			// can run tests at the same time without interference.
			// const account = await acquireAccount(id);

			// Perform authentication steps. Replace these actions with your own.
			// await page.goto('https://github.com/login');
			// await page.getByLabel('Username or email address').fill(account.username);
			// await page.getByLabel('Password').fill(account.password);
			// await page.getByRole('button', { name: 'Sign in' }).click();
			await page.goto('/');
			await page.getByRole('button', { name: 'Sign In with Auth0' }).click();
			await page.getByLabel('Email address').fill(TEST_USER_EMAIL);
			await page.getByLabel('Password').fill(TEST_USER_PASSWORD);
			await page.getByRole('button', { name: 'Continue', exact: true }).click();
			// Wait until the page receives the cookies.
			//
			// Sometimes login flow sets cookies in the process of several redirects.
			// Wait for the final URL to ensure that the cookies are actually set.
			// await page.waitForURL('https://github.com/');
			// Alternatively, you can wait until the page reaches a state where all cookies are set.
			// await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();
			await expect(page.getByText(`Logged in: ${TEST_USER_EMAIL}`)).toBeVisible();

			// End of authentication steps.

			await page.context().storageState({ path: fileName });
			await page.close();
			await use(fileName);
		},
		{ scope: 'worker' }
	]
});
