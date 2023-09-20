<script lang="ts">
	import type { PageData } from './$types';
	import PokemonPreview from '$lib/components/pokemon/pokemon-preview.svelte';

	export let data: PageData;
</script>

<h2 class="h4">Welcome to Pokeland</h2>
<p><a class="link" href="/pokemon">Check out all the pokemons!</a></p>

<h2 class="h2 mt-4">My favorite pokemons</h2>
<ul class="pokegrid">
	{#each data.favoritePokemon as savedPokemon (savedPokemon.pokemon_id)}
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
