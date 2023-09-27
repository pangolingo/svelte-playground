<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import PokemonPreview from '$lib/components/pokemon/PokemonPreview.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2 class="h4">Welcome to Pokeland</h2>
<p><a class="link" href="/pokemon">Check out all the pokemons!</a></p>

{#if data.session?.user}
	<h2 class="h2 mt-4">My favorite pokemons</h2>
	
	{#await data.streaming.favoritePokemon}
	<div class="p-8">
		<Loading />
	</div>
	{:then value}
	{#if value.length < 1}
		<p>You haven't saved any Pokemon yet.</p>
	{:else}
	<ul class="pokegrid">
		
		{#each value as savedPokemon (savedPokemon.pokemon_id)}
			<li>
				<PokemonPreview
					pokemon={{
						id: savedPokemon.pokemon_id,
						name: savedPokemon.pokemon_name
					}}
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
