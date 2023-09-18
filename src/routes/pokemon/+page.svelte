<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { getPageNumberFromSearchParams } from '$lib/url-params';
	import PokemonPreview from '$lib/components/pokemon/pokemon-preview.svelte';

	export let data: PageData;
	$: pageNumber = getPageNumberFromSearchParams($page.url.searchParams);
</script>

<h2>My favorites</h2>
<ul class="space-x-2 space-y-2 grid" style="grid-template-columns: repeat(auto-fit, 250px);">
	{#each data.favoritePokemon as savedPokemon (savedPokemon.pokemon_id)}
		<li>
			<PokemonPreview
				pokemon={{
					id: savedPokemon.pokemon_id,
					name: savedPokemon.pokemon_name
				}}
			/>
		</li>
	{/each}
</ul>

<h2>{data.pokemonPage.page.count} pokemon (page {pageNumber})</h2>

<ul
	class="space-x-2 space-y-2 grid"
	style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));"
>
	{#each data.pokemonPage.pokemon as pokemon (pokemon.id)}
		<li>
			<PokemonPreview {pokemon} />
		</li>
	{/each}
</ul>
{#if data.pokemonPage.page.previous}<a href="?page={pageNumber - 1}" class="btn">Previous page</a
	>{/if}
{#if data.pokemonPage.page.next}<a href="?page={pageNumber + 1}" class="btn">Next page</a>{/if}
