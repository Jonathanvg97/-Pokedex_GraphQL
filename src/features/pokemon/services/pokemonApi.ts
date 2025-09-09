import { useQuery } from "@apollo/client/react";
import {
  GET_POKEMON_DETAILS,
  GET_POKEMON_TYPES,
  type GetPokemonDetailsData,
  type GetPokemonTypesData,
} from "../../../services/queries";

export const usePokemonDetails = (id: number | null) => {
  const { loading, error, data } = useQuery<GetPokemonDetailsData>(
    GET_POKEMON_DETAILS,
    { variables: { id: id ?? 0 }, skip: !id }
  );

  return {
    loading,
    error: error?.message,
    pokemon: data?.pokemon || null,
  };
};

export const usePokemonTypes = () => {
  const { loading, error, data } =
    useQuery<GetPokemonTypesData>(GET_POKEMON_TYPES);

  return {
    loading,
    error: error?.message,
    types: data?.types.results || [],
  };
};
