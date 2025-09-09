import { useQuery } from "@apollo/client/react";
import {
  GET_POKEMONS,
  GET_POKEMON_DETAILS,
  GET_POKEMON_TYPES,
  SEARCH_POKEMONS,
  type GetPokemonDetailsData,
  type GetPokemonTypesData,
  type GetPokemonsData,
  type SearchPokemonsData,
} from "../../../services/queries";
import type { Pokemon, PokemonDetails } from "../../../types/pokemon";

interface UsePokemonsResult {
  loading: boolean;
  error?: string;
  pokemons: Pokemon[];
  fetchMore: string;
}

interface UsePokemonDetailsResult {
  loading: boolean;
  error?: string;
  pokemon: PokemonDetails | null;
}

interface UsePokemonTypesResult {
  loading: boolean;
  error?: string;
  types: { id: number; name: string }[];
}

interface UseSearchPokemonsResult {
  loading: boolean;
  error?: string;
  searchResults: Pokemon[];
}

export const usePokemons = (
  limit: number = 20,
  offset: number = 0
): UsePokemonsResult => {
  const { loading, error, data, fetchMore } = useQuery<GetPokemonsData>(
    GET_POKEMONS,
    {
      variables: { limit, offset },
    }
  );

  return {
    loading,
    error,
    pokemons: data?.pokemon_v2_pokemon || [],
    fetchMore,
  };
};

export const usePokemonDetails = (
  id: number | null
): UsePokemonDetailsResult => {
  const { loading, error, data } = useQuery<GetPokemonDetailsData>(
    GET_POKEMON_DETAILS,
    {
      variables: { id: id ? parseInt(id.toString()) : 0 },
      skip: !id,
    }
  );

  return {
    loading,
    error,
    pokemon: data?.pokemon_v2_pokemon_by_pk || null,
  };
};

export const usePokemonTypes = (): UsePokemonTypesResult => {
  const { loading, error, data } =
    useQuery<GetPokemonTypesData>(GET_POKEMON_TYPES);

  return {
    loading,
    error,
    types: data?.pokemon_v2_type || [],
  };
};

export const useSearchPokemons = (
  searchTerm: string
): UseSearchPokemonsResult => {
  const { loading, error, data } = useQuery<SearchPokemonsData>(
    SEARCH_POKEMONS,
    {
      variables: { search: `%${searchTerm}%` },
      skip: !searchTerm || searchTerm.length < 3,
    }
  );

  return {
    loading,
    error,
    searchResults: data?.pokemon_v2_pokemon || [],
  };
};
