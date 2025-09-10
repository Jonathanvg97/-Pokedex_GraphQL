import { gql } from "@apollo/client";
import type { Pokemon, PokemonDetails, PokemonType } from "../types/pokemon";

// Obtener lista de Pokémon
export const GET_POKEMONS = gql`
  query GetPokemons($limit: Int!, $offset: Int!) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        id
        name
        image
      }
    }
  }
`;
// Buscar Pokémon por nombre
export const SEARCH_POKEMONS = gql`
  query SearchPokemons($name: String!) {
    pokemon(name: $name) {
      id
      name
    }
  }
`;
// Obtener detalles de un Pokémon
export const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($name: String!) {
    pokemon(name: $name) {
      id
      name
      height
      weight
      base_experience
      types {
        type {
          name
        }
      }
      stats {
        stat {
          name
        }
        base_stat
      }
    }
  }
`;

// Obtener tipos de Pokémon
export const GET_POKEMON_TYPES = gql`
  query GetPokemonTypes {
    types {
      results {
        id
        name
      }
    }
  }
`;

// Tipos de datos
export interface GetPokemonsData {
  pokemons: { results: Pokemon[] };
}

export interface SearchPokemonsData {
  pokemon: Pokemon | null;
}

export interface GetPokemonDetailsData {
  pokemon: PokemonDetails;
}

export interface GetPokemonTypesData {
  types: { results: PokemonType[] };
}
