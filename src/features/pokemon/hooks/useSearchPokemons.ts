import { SEARCH_POKEMONS, type SearchPokemonsData } from "@/services/queries";
import { useQuery } from "@apollo/client/react";
import { toast } from "react-toastify";

export const useSearchPokemons = (name: string) => {
  const { loading, error, data } = useQuery<SearchPokemonsData>(
    SEARCH_POKEMONS,
    {
      variables: { name },
      skip: name.trim() === "",
    }
  );

  if (error) {
    toast.error(
      "Error al buscar el Pokémon, limpia el filtro e intenta de nuevo"
    );
  }

  return {
    loading,
    error: error?.message,
    searchResults: data?.pokemon ?? null,
  };
};
