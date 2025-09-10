import { GET_POKEMONS, type GetPokemonsData } from "@/services/queries";
import { useQuery } from "@apollo/client/react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSearchPokemons } from "./useSearchPokemons";
import { useDebounce } from "@/hooks/useDebounce";
import { EnumTypeFilters } from "@/types/pokemon";

export const usePokemons = (limit: number = 20) => {
  //local states
  const [offset, setOffset] = useState<number>(0);
  const [allPokemons, setAllPokemons] = useState<
    GetPokemonsData["pokemons"]["results"]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<EnumTypeFilters>(
    EnumTypeFilters.NAME
  );
  const [selectedType, setSelectedType] = useState<string>("");

  //hooks
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { searchResults, loading: loadingSearch } =
    useSearchPokemons(debouncedSearchTerm);
  //destructuring
  const { data, loading, error } = useQuery<GetPokemonsData>(GET_POKEMONS, {
    variables: { limit, offset },
    skip: !!debouncedSearchTerm,
  });
  // Si hay búsqueda devuelve el resultado filtrado
  const pokemons = debouncedSearchTerm
    ? searchResults && searchResults.id
      ? [searchResults]
      : []
    : allPokemons;
  //
  const loadMore = () => setOffset((prev) => prev + limit);

  const handleResetFilter = () => setSearchTerm("");

  //effects
  useEffect(() => {
    if (data?.pokemons.results) {
      setAllPokemons((prev) => {
        // Evitar duplicados por si vuelven a traer los mismos
        const newPokemons = data.pokemons.results.filter(
          (p) => !prev.find((prevP) => prevP.id === p.id)
        );
        let updatedPokemons = [...prev, ...newPokemons];

        // 🔹 Orden dinámico
        if (selectedOption === EnumTypeFilters.NAME) {
          updatedPokemons = updatedPokemons.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
        } else {
          updatedPokemons = updatedPokemons.sort(
            (a, b) => Number(a.id) - Number(b.id)
          );
        }

        return updatedPokemons;
      });
    }
  }, [data, selectedOption]);
  //
  useEffect(() => {
    if (error) {
      toast.error("Error al cargar los Pokémons, inténtalo de nuevo");
    }
  }, [error]);
  //
  return {
    pokemons,
    loading,
    error,
    loadMore,
    searchTerm,
    setSearchTerm,
    searchResults,
    handleResetFilter,
    loadingSearch,
    selectedOption,
    setSelectedOption,
    selectedType,
    setSelectedType,
  };
};
