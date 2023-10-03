<script lang="ts">
  import PokemonPreview from '$lib/components/pokemon/PokemonPreview.svelte';
  import PokemonPreviewSkeleton from '$lib/components/pokemon/PokemonPreviewSkeleton.svelte';
  import type { PageData } from './$types';
  import pokeImage from '$lib/assets/pokemon-michael-rivera-unsplash.jpg?w=400&format=webp&quality=75&imagetools';

  export let data: PageData;
</script>

<h2 class="h4">Welcome to Pokeland</h2>
<p><a class="link" href="/pokemon">Check out all the pokemons!</a></p>

<figure class="my-4">
  <img alt="Pikachu and Squirtle Pokemon toys in the grass" src={pokeImage} />
  <figcaption>
    <small>
      Photo by <a
        href="https://unsplash.com/@gojomike?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >Michael Rivera</a
      >
      on
      <a
        href="https://unsplash.com/photos/DypO_XgAE4Y?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >Unsplash</a
      >
    </small>
  </figcaption>
</figure>

{#if data.session?.user}
  <h2 class="h2 mt-4 mb-2">My favorite pokemons</h2>

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
              --view-transition-name={`pokemon-card-${savedPokemon.id}`}
            />
          </li>
        {/each}
      </ul>
    {/if}
  {:catch error}
    <p>Error loading saved pokemon: {error.message}</p>
  {/await}
{/if}
