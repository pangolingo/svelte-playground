<script lang="ts">
	type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

	import type { Pokemon } from '$lib/pokemon-api';

	export let pokemon: Optional<Pick<Pokemon, 'id' | 'name' | 'sprites'>, 'sprites'>;
</script>

<a
	class="rounded-md bg-amber-200 flex flex-col p-2 aspect-[5/7] text-center"
	href="/pokemon/{pokemon.id}"
>
	<span class="flex-1 flex justify-center items-center">
		{#if pokemon.sprites}
			<img
				src={pokemon.sprites.front_default}
				alt=""
				class="w-full"
				style="image-rendering: pixelated;image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
			/>
		{/if}
	</span>
	<h3 class="h3 uppercase pb-4">
		#{pokemon.id}
		{pokemon.name}
	</h3>
</a>
