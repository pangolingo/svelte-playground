import { savePokemon, unsavePokemon } from "$lib/saved-pokemon.js";
import { error, fail, redirect } from "@sveltejs/kit";
import { API_BASE_URL, getSinglePokemon } from "$lib/pokemon-api";
import { isSaved } from "$lib/saved-pokemon.js";


export async function load({ params, parent }) {
  if (params.id == null) {
    throw error(404, 'Not found');
  }
  const id = parseInt(params.id, 10)

  const { session } = await parent()

  return {
    pokemon: getSinglePokemon(`${API_BASE_URL}/pokemon/${params.id}`),
    isSaved: session?.user?.sub ? isSaved(id, session?.user.sub) : false
  }
}

export const actions = {
  save: async (event) => {
    const { request, locals } = event;
    const session = await locals.getSession();
    console.log(session)
    // if (!session?.user) throw error(401, 'Unauthorized')
    if (!session?.user?.sub) {
      return fail(401, { unauthorized: true })
    }


    const data = await request.formData();
    console.log('saving pokemon', data)
    const id = data.get('pokemon_id')
    const name = data.get('pokemon_name')
    if (typeof id !== 'string' || typeof name !== 'string') {
      throw new Error('Id or name is not set')
    }
    await savePokemon(parseInt(id, 10), name, session.user.sub)

    return { success: true };
  },
  unsave: async ({ request, locals }) => {
    const session = await locals.getSession();
    console.log(session)
    // if (!session?.user) throw error(401, 'Unauthorized')
    if (!session?.user?.sub) {
      return fail(401, { unauthorized: true })
    }

    const data = await request.formData();
    console.log('unsaving pokemon', data)
    const id = data.get('pokemon_id')
    if (typeof id !== 'string') {
      throw new Error('Id is not set')
    }
    await unsavePokemon(parseInt(id, 10), session.user.sub)

    return { success: true };
  }
}