import { getSavedPokemon } from '$lib/database/saved-pokemon';

export async function load({ locals }) {
  const session = await locals.getSession();

  if (!session?.user) {
    return {
      streaming: {
        favoritePokemon: Promise.resolve([])
      }
    };
  }

  if (!session?.user.sub) {
    throw new Error('Unexpected user without sub');
  }

  return {
    streaming: {
      favoritePokemon: getSavedPokemon(session.user.sub)
    }
  };
}
