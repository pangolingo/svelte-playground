import { listPokemonPage } from "$lib/pokemon-api";
import { getPageNumberFromSearchParams } from "$lib/url-params.js";

export async function load({ url, fetch, data }) {
  const pageNumber = getPageNumberFromSearchParams(url.searchParams)
  return {
    favoritePokemon: data.favoritePokemon,
    pokemonPage: listPokemonPage(pageNumber, fetch),
  }
}