import { getSavedPokemon } from '$lib/database/saved-pokemon';
import { getSinglePokemonById } from '$lib/pokemon-api';

export async function load({ locals, fetch }) {
	const session = await locals.getSession();

	if (!session?.user) {
		return {
			streaming: {
				favoritePokemon: []
			}
		};
	}

	if (!session?.user.sub) {
		throw new Error('Unexpected user without sub');
	}

	const savedPokemon = await getSavedPokemon(session.user.sub);
	const enhancedSavedPokemon = Promise.all(
		savedPokemon.map((p) => {
			return getSinglePokemonById(p.pokemon_id, fetch);
		})
	);

	return {
		streaming: {
			favoritePokemon: enhancedSavedPokemon
		}
	};
}
