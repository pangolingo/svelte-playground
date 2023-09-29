<script lang="ts">
  import { enhance } from '$app/forms';
  import PokemonPreview from '$lib/components/pokemon/PokemonPreview.svelte';
  import type { ActionData, PageData } from './$types';

  export let data: PageData;
  export let form: ActionData;
</script>

<div class="grid grid-cols-2 max-w-2xl gap-4">
  <PokemonPreview
    pokemon={data.pokemon}
    favorite={data.isSaved}
    link={false}
    --view-transition-name={`pokemon-card-${data.pokemon.id}`}
  />
  <div class="flex flex-col">
    <section class="flex-1">
      <h3 class="h3 mt-2">Abilities</h3>
      <ul>
        {#each data.pokemon.abilities as ability}
          <li>
            {ability.ability.name}
          </li>
        {/each}
      </ul>
    </section>

    <form method="post" action="?/save" use:enhance>
      <input type="hidden" name="pokemon_id" value={data.pokemon.id} />
      <input type="hidden" name="pokemon_name" value={data.pokemon.name} />
      {#if form?.success}
        {#if data.isSaved}<p>Saved!</p>{/if}
        {#if !data.isSaved}<p>Unsaved!</p>{/if}
      {/if}
      {#if form?.unauthorized}
        <p>Please log in to save this pokemon.</p>
      {/if}
      {#if data.isSaved}
        <button class="btn" type="submit" formaction="?/unsave">💔 Remove saved pokemon</button>
      {:else}
        <button class="btn" type="submit">❤️ Save pokemon</button>
      {/if}
    </form>
  </div>
</div>
