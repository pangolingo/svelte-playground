<script lang="ts">
  import { page } from '$app/stores';
  import PokemonPreview from '$lib/components/pokemon/PokemonPreview.svelte';
  import PokemonPreviewSkeleton from '$lib/components/pokemon/PokemonPreviewSkeleton.svelte';
  import { getPageNumberFromSearchParams } from '$lib/helpers/pagination';
  import type { PageData } from './$types';

  export let data: PageData;
  export let favoritePokemonIds: number[] = [];

  $: pageNumber = getPageNumberFromSearchParams($page.url.searchParams);
  data.streaming.favoritePokemon
    .then((f) => f.map((p) => p.pokemon_id))
    .then((f) => {
      favoritePokemonIds = f;
    });
</script>

{#await data.streaming.pokemonPage}
  <h2>20 pokemon (page {pageNumber})</h2>

  <ul class="pokegrid">
    {#each Array(20) as _}
      <li>
        <PokemonPreviewSkeleton />
      </li>
    {/each}
  </ul>
{:then value}
  <h2>{value.page.count} pokemon (page {pageNumber})</h2>

  <ul class="pokegrid">
    {#each value.pokemon as pokemon (pokemon.id)}
      <li>
        <PokemonPreview {pokemon} favorite={favoritePokemonIds.includes(pokemon.id)} --view-transition-name={`pokemon-card-${pokemon.id}`} />
      </li>
    {/each}
  </ul>
  <div class="flex mt-2 space-x-2">
    {#if value.page.previous}<a href="?page={pageNumber - 1}" class="btn">Previous page</a>{/if}
    {#if value.page.next}<a href="?page={pageNumber + 1}" class="btn">Next page</a>{/if}
  </div>
{:catch error}
  <p>Error loading pokemon: {error.message}</p>
{/await}
