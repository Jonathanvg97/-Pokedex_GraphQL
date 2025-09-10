import {
  GET_POKEMON_DETAILS,
  GET_POKEMONS,
  type GetPokemonDetailsData,
  type GetPokemonsData,
} from "@/services/queries";
import { useApolloClient, useQuery } from "@apollo/client/react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSearchPokemons } from "./useSearchPokemons";
import { useDebounce } from "@/hooks/useDebounce";
import {
  EnumTypeFilters,
  type Pokemon,
  type PokemonWithTypes,
} from "@/types/pokemon";

export const usePokemons = (limit: number = 40) => {
  //local states
  const [offset, setOffset] = useState<number>(0);
  const [allPokemons, setAllPokemons] = useState<PokemonWithTypes[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<EnumTypeFilters>(
    EnumTypeFilters.NAME
  );
  const [selectedType, setSelectedType] = useState<string>("");

  //hooks
  const client = useApolloClient();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { searchResults, loading: loadingSearch } =
    useSearchPokemons(debouncedSearchTerm);
  //destructuring
  const { data, loading, error } = useQuery<GetPokemonsData>(GET_POKEMONS, {
    variables: { limit, offset },
    skip: !!debouncedSearchTerm,
  });

  //
  const loadMore = () => setOffset((prev) => prev + limit);

  const handleResetFilter = () => setSearchTerm("");

  // 🔹 Enriquecer los Pokémon con tipos en paralelo
  const enrichPokemonsWithTypes = async (
    newPokemons: Pokemon[]
  ): Promise<PokemonWithTypes[]> => {
    const promises = newPokemons.map(async (p) => {
      try {
        const res = await client.query<GetPokemonDetailsData>({
          query: GET_POKEMON_DETAILS,
          variables: { name: p.name },
        });
        const types = res.data?.pokemon?.types.map((t) => t.type.name) ?? [];
        return { ...p, types };
      } catch (err) {
        console.error(`Error fetching details for ${p.name}:`, err);
        return { ...p, types: [] };
      }
    });

    return await Promise.all(promises);
  };
  //effects
  useEffect(() => {
    if (!data?.pokemons.results) return;

    const newPokemons = data.pokemons.results.filter(
      (p) => !allPokemons.find((ap) => ap.id === p.id)
    );
    if (newPokemons.length === 0) return;

    enrichPokemonsWithTypes(newPokemons).then((enriched) => {
      let updated = [...allPokemons, ...enriched];
      updated =
        selectedOption === EnumTypeFilters.NAME
          ? updated.sort((a, b) => a.name.localeCompare(b.name))
          : updated.sort((a, b) => a.id - b.id);

      setAllPokemons(updated);
    });
  }, [data, selectedOption]);

  // Filtrar por tipo y ordenar según selectedOption
  const filteredPokemons = (() => {
    let filtered = selectedType
      ? allPokemons.filter((p) => p.types?.includes(selectedType))
      : [...allPokemons];

    filtered =
      selectedOption === EnumTypeFilters.NAME
        ? filtered.sort((a, b) => a.name.localeCompare(b.name))
        : filtered.sort((a, b) => a.id - b.id);

    return filtered;
  })();

  //
  useEffect(() => {
    if (error) {
      toast.error("Error al cargar los Pokémons, inténtalo de nuevo");
    }
  }, [error]);
  //
  return {
    pokemons: filteredPokemons,
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
