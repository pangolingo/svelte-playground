import { listPokemonPage } from '$lib/pokemon-api';
import { getPageNumberFromSearchParams } from '$lib/helpers/pagination.js';

export async function load({ url, fetch, data }) {
	const pageNumber = getPageNumberFromSearchParams(url.searchParams);
	return {
		...data,
		pokemonPage: listPokemonPage(pageNumber, fetch),
		pageMeta: { pageTitle: 'All Pokemon' }
	};
}
