// import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import type { HandleFetch } from "@sveltejs/kit";

export const API_BASE_URL = 'https://pokeapi.co/api/v2'
// const API_URL = 'https://beta.pokeapi.co/graphql/v1beta'

// const client = new ApolloClient({
//   uri: API_URL,
//   cache: new InMemoryCache(),
// });

export interface PokemonPageInfo {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface PokemonList extends PokemonPageInfo {
  results: PokemonListResult[];
}

export interface PokemonListResult {
  name: string;
  url: string;
}

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: Species[];
  game_indices: GameIndex[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: any[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface Ability {
  ability: Species;
  is_hidden: boolean;
  slot: number;
}

export interface Species {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  version: Species;
}

export interface Move {
  move: Species;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: Species;
  version_group: Species;
}

export interface GenerationV {
  "black-white": Sprites;
}

export interface GenerationIv {
  "diamond-pearl": Sprites;
  "heartgold-soulsilver": Sprites;
  platinum: Sprites;
}

export interface Versions {
  "generation-i": GenerationI;
  "generation-ii": GenerationIi;
  "generation-iii": GenerationIii;
  "generation-iv": GenerationIv;
  "generation-v": GenerationV;
  "generation-vi": { [key: string]: Home };
  "generation-vii": GenerationVii;
  "generation-viii": GenerationViii;
}

export interface Sprites {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
  other?: Other;
  versions?: Versions;
  animated?: Sprites;
}

export interface GenerationI {
  "red-blue": RedBlue;
  yellow: RedBlue;
}

export interface RedBlue {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export interface GenerationIi {
  crystal: Crystal;
  gold: Gold;
  silver: Gold;
}

export interface Crystal {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

export interface Gold {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent?: string;
}

export interface GenerationIii {
  emerald: OfficialArtwork;
  "firered-leafgreen": Gold;
  "ruby-sapphire": Gold;
}

export interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

export interface Home {
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
}

export interface GenerationVii {
  icons: DreamWorld;
  "ultra-sun-ultra-moon": Home;
}

export interface DreamWorld {
  front_default: string;
  front_female: null;
}

export interface GenerationViii {
  icons: DreamWorld;
}

export interface Other {
  dream_world: DreamWorld;
  home: Home;
  "official-artwork": OfficialArtwork;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Species;
}

export interface Type {
  slot: number;
  type: Species;
}

const pageLimit = 20

const getPageOffset = (pageNumber: number, pageLimit: number): number => {
  return pageLimit * (pageNumber - 1)
}

export async function listPokemonPage(pageNumber: number, fetchMethod: typeof fetch = fetch): Promise<{ pokemon: Pokemon[], page: PokemonPageInfo }> {
  if (pageNumber == null || pageNumber < 1) {
    throw new Error('Unexpected page number')
  }
  const response = await fetchMethod(`${API_BASE_URL}/pokemon?offset=${getPageOffset(pageNumber, pageLimit)}&limit=${pageLimit}`)
  const pokemonList: PokemonList = await response.json();

  // const pokemonUrls = pokemonList.results.map(p => p.url)
  const singlePokemons = await Promise.all(pokemonList.results.map((p) => {
    return getSinglePokemon(p.url)
  }))
  return {
    pokemon: singlePokemons, page: {
      next: pokemonList.next,
      previous: pokemonList.previous,
      count: pokemonList.count,
    }
  }

  // return client
  //   .query({
  //     query: gql`
  //       query ListPokemon {
  //         pokemon_v2_pokemon(limit: 10, offset: 0, order_by: {id: asc}) {
  //           id
  //           name
  //           order
  //           pokemon_v2_pokemonsprites {
  //             sprites
  //           }
  //           pokemon_v2_pokemonspecy {
  //             is_legendary
  //           }
  //         }
  //       }
  //   `,
  //   })
  //   .then((result) => {
  //     console.log(result);
  //     return result;
  //   });
}

export async function getSinglePokemon(url: string): Promise<Pokemon> {
  const response = await fetch(url)
  return response.json()
}