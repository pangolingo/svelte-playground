<script lang="ts">
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { onMount } from 'svelte';
	import '../app.css';

	let altSession: typeof $page.data.session;
	onMount(async () => {
		// workaround to get session information on a prerendered page
		// this only works because Auth.js already sets up an API endpoint for us to use
		if (!$page.data.session) {
			// are we actually logged out, or just on a prerendered page
			const result = await fetch('/auth/session');
			const json = await result.json();
			console.log('json', json);
			if (json?.user) {
				altSession = json;
			}
		}
	});
</script>

<header class="border-gray-800 border-b-2 mb-2 pb-2">
	<h1 class="h1"><a href="/">Pokeland</a></h1>
	<nav>
		<a class="link" href="/about">About</a>
		<a class="link" href="/contact">Contact</a>
	</nav>
	{#if $page.data.session}
		Logged in: {$page.data.session.user?.name}
		<button on:click={() => signOut()} class="btn">Sign out</button>
	{:else if altSession}
		Logged in: {altSession.user?.name}
		<button on:click={() => signOut()} class="btn">Sign out</button>
	{:else}
		Logged out
		<!-- Auth.js core doesn't support federated log out yet. The user will be logged out of the app but not Auth0. https://github.com/nextauthjs/next-auth/issues/1384 -->
		<!-- we can get around it by force-showing auth0 login prompt -->
		<!-- this is a security issue -->
		<!-- we could manually work around it: https://github.com/nextauthjs/next-auth/issues/836 -->
		<button class="btn" on:click={() => signIn('auth0', undefined, { prompt: 'login' })}
			>Sign In with Auth0</button
		>
	{/if}
</header>

<slot />
