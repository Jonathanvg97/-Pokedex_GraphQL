import { gql } from "@apollo/client";
import type { Pokemon, PokemonDetails } from "../types/pokemon";

export const GET_POKEMONS = gql`
  query GetPokemons($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      order_by: { name: asc }
    ) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

export const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      height
      weight
      base_experience
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

export const GET_POKEMON_TYPES = gql`
  query GetPokemonTypes {
    pokemon_v2_type(where: { id: { _lte: 18 } }) {
      id
      name
    }
  }
`;

export const SEARCH_POKEMONS = gql`
  query SearchPokemons($search: String!) {
    pokemon_v2_pokemon(
      where: { name: { _ilike: $search } }
      order_by: { name: asc }
    ) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

// Tipos para las respuestas de las queries
export interface GetPokemonsData {
  pokemon_v2_pokemon: Pokemon[];
}

export interface GetPokemonDetailsData {
  pokemon_v2_pokemon_by_pk: PokemonDetails;
}

export interface GetPokemonTypesData {
  pokemon_v2_type: {
    id: number;
    name: string;
  }[];
}

export interface SearchPokemonsData {
  pokemon_v2_pokemon: Pokemon[];
}
