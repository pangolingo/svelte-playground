import { getPageNumberFromSearchParams } from '$lib/helpers/pagination.js';
import { listPokemonPage } from '$lib/pokemon-api';

export async function load({ url, fetch, data }) {
  const pageNumber = getPageNumberFromSearchParams(url.searchParams);
  return {
    ...data,
    streaming: {
      ...data.streaming,
      pokemonPage: listPokemonPage(pageNumber, fetch)
    },
    pageMeta: { pageTitle: 'All Pokemon' }
  };
}
