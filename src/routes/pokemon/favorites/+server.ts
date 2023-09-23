import { getSavedPokemon } from '$lib/database/saved-pokemon';
import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
	const session = await locals.getSession();

	if (!session?.user) {
		return json({ unauthorized: true }, { status: 401 });
	}

	if (!session?.user.sub) {
		throw new Error('Unexpected user without sub');
	}

	return json({
		favoritePokemon: await getSavedPokemon(session.user.sub).then((savedPokemon) =>
			savedPokemon.map((pokemon) => {
				const { user_id, created_at, ...sanitizedPokemon } = pokemon;
				return sanitizedPokemon;
			})
		)
	});
}
