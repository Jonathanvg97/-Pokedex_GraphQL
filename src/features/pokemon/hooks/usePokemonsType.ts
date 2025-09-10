import {
  GET_POKEMON_TYPES,
  type GetPokemonTypesData,
} from "@/services/queries";
import type { PokemonType } from "@/types/pokemon";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";

export const usePokemonTypes = () => {
  //
  const { loading, error, data } =
    useQuery<GetPokemonTypesData>(GET_POKEMON_TYPES);
  //
  const [typesPokemons, setTypesPokemons] = useState<PokemonType[]>([]);
  //
  useEffect(() => {
    if (data?.types.results) {
      setTypesPokemons(data.types.results);
    }
  }, [data]);
  return {
    loading,
    error: error?.message,
    types: data?.types.results || [],
    typesPokemons,
  };
};
