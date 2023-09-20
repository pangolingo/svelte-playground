<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { getPageNumberFromSearchParams } from '$lib/url-params';
	import PokemonPreview from '$lib/components/pokemon/pokemon-preview.svelte';

	export let data: PageData;
	$: pageNumber = getPageNumberFromSearchParams($page.url.searchParams);
	$: favoritePokemonIds = data.favoritePokemon.map((p) => p.pokemon_id);
</script>

<h2>{data.pokemonPage.page.count} pokemon (page {pageNumber})</h2>

<ul class="pokegrid">
	{#each data.pokemonPage.pokemon as pokemon (pokemon.id)}
		<li>
			<PokemonPreview {pokemon} favorite={favoritePokemonIds.includes(pokemon.id)} />
		</li>
	{/each}
</ul>
<div class="flex mt-2 space-x-2">
	{#if data.pokemonPage.page.previous}<a href="?page={pageNumber - 1}" class="btn">Previous page</a
		>{/if}
	{#if data.pokemonPage.page.next}<a href="?page={pageNumber + 1}" class="btn">Next page</a>{/if}
</div>
