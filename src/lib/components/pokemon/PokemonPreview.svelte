<script lang="ts">
  type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

  import type { Pokemon } from '$lib/pokemon-api';

  export let pokemon: Optional<Pick<Pokemon, 'id' | 'name' | 'sprites'>, 'sprites'>;
  export let favorite = false;
  export let link = true;
</script>

<style>
  img {
    image-rendering: pixelated; 
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
  .pokecard {
    view-transition-name: var(--view-transition-name, pokemon-card);
  }
</style>

<svelte:element this={link ? 'a' : 'section'}
  class="rounded-md bg-amber-200 flex flex-col p-2 aspect-[5/7] text-center relative pokecard"
  href="/pokemon/{pokemon.id}"
>
  {#if favorite}
    <span class="uppercase absolute left-2 top-2">❤️</span>
  {/if}
  <span class="flex-1 flex justify-center items-center">
    {#if pokemon.sprites}
      <img
        src={pokemon.sprites.front_default}
        alt=""
        class="w-full"
      />
    {/if}
  </span>
  <h3 class="h3 uppercase pb-4">
    #{pokemon.id}
    {pokemon.name}
  </h3>
</svelte:element>
