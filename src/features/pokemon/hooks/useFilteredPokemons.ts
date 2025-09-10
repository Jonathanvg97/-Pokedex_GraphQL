import { useDebounce } from "@/hooks/useDebounce";
import { useMemo } from "react";
import { EnumTypeFilters, type PokemonWithTypes } from "@/types/pokemon";
import { useSearchPokemons } from "./useSearchPokemons";

export const useFilteredPokemons = (
  allPokemons: PokemonWithTypes[],
  searchTerm: string,
  selectedType: string,
  selectedOption: EnumTypeFilters
) => {
  const debouncedTerm = useDebounce(searchTerm, 500);

  // Búsqueda remota solo si hay término de búsqueda
  const { searchResults: remoteResult, loading: loadingSearch } =
    useSearchPokemons(debouncedTerm);

  const filtered = useMemo(() => {
    let base: PokemonWithTypes[] = [];

    if (debouncedTerm) {
      base =
        remoteResult && remoteResult.id && remoteResult.name
          ? [remoteResult as PokemonWithTypes]
          : [];
    } else {
      base = allPokemons;
    }

    // Filtrar por tipo si aplica
    if (selectedType) {
      base = base.filter((p) => p.types?.includes(selectedType));
    }

    // Ordenar según opción seleccionada
    base =
      selectedOption === EnumTypeFilters.NAME
        ? [...base].sort((a, b) => a.name.localeCompare(b.name))
        : [...base].sort((a, b) => a.id - b.id);

    return base;
  }, [allPokemons, remoteResult, debouncedTerm, selectedType, selectedOption]);

  return {
    filtered,
    loadingSearch,
  };
};
