<script lang="ts">
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<h2 class="h2 uppercase">{data.pokemon.name}</h2>

<form method="post" action="?/save">
	<input type="hidden" name="pokemon_id" value={data.pokemon.id} />
	<input type="hidden" name="pokemon_name" value={data.pokemon.name} />
	{#if data.isSaved}
		<button class="btn" type="submit" formaction="?/unsave">Remove saved pokemon</button>
	{:else}
		<button class="btn" type="submit">Save pokemon</button>
	{/if}
	{#if form?.success}
		{#if data.isSaved}<p>Saved!</p>{/if}
		{#if !data.isSaved}<p>Unsaved!</p>{/if}
	{/if}
	{#if form?.unauthorized}
		<p>Please log in to save this pokemon.</p>
	{/if}
</form>

<img src={data.pokemon.sprites.front_default} alt="the pokemon sprite from the game" />

<h3 class="h3">Abilities</h3>
<ul>
	{#each data.pokemon.abilities as ability}
		<li>
			{ability.ability.name}
		</li>
	{/each}
</ul>
