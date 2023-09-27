<script lang="ts">
	import PokemonPreview from '$lib/components/pokemon/PokemonPreview.svelte';
	import PokemonPreviewSkeleton from '$lib/components/pokemon/PokemonPreviewSkeleton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2 class="h4">Welcome to Pokeland</h2>
<p><a class="link" href="/pokemon">Check out all the pokemons!</a></p>

{#if data.session?.user}
	<h2 class="h2 mt-4">My favorite pokemons</h2>
	
	{#await data.streaming.favoritePokemon}
		<ul class="pokegrid">
			{#each Array(3) as _}
				<li>
					<PokemonPreviewSkeleton />
				</li>
			{/each}
		</ul>
	{:then value}
	{#if value.length < 1}
		<p>You haven't saved any Pokemon yet.</p>
	{:else}
		<ul class="pokegrid">
			
			{#each value as savedPokemon (savedPokemon.id)}
				<li>
					<PokemonPreview
						pokemon={savedPokemon}
						favorite={true}
					/>
				</li>
			{/each}
		</ul>
	{/if}
	{:catch error}
		<p>Error loading saved pokemon: {error.message}</p>
	{/await}
{/if}
