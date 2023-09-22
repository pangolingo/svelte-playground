import { getSavedPokemon } from "$lib/database/saved-pokemon"

export async function load({ url, fetch, locals }) {
  const session = await locals.getSession()

  if (!session?.user) {
    return {
      favoritePokemon: []
    }
  }

  if (!session?.user.sub) {
    throw new Error('Unexpected user without sub')
  }

  return {
    favoritePokemon: getSavedPokemon(session.user.sub)
  }
}