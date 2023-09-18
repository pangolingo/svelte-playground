<script>
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import '../app.css';
</script>

<header class="border-gray-800 border-b-2 mb-2">
	<h1 class="h1"><a href="/">Pokeland</a></h1>
	{#if $page.data.session}
		Logged in: {$page.data.session.user?.name}
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
