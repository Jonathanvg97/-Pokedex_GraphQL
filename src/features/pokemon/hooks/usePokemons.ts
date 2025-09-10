import {
  GET_POKEMON_DETAILS,
  GET_POKEMONS,
  type GetPokemonDetailsData,
  type GetPokemonsData,
} from "@/services/queries";
import { useApolloClient, useQuery } from "@apollo/client/react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  EnumTypeFilters,
  type Pokemon,
  type PokemonWithTypes,
} from "@/types/pokemon";
import db from "@/config/db";
import { useFilteredPokemons } from "./useFilteredPokemons";

export const usePokemons = (limit: number = 40) => {
  //local state
  const [offset, setOffset] = useState<number>(0);
  const [allPokemons, setAllPokemons] = useState<PokemonWithTypes[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<EnumTypeFilters>(
    EnumTypeFilters.NAME
  );
  const [selectedType, setSelectedType] = useState<string>("");
  //hook  filtrado
  const { filtered: filteredPokemons, loadingSearch } = useFilteredPokemons(
    allPokemons,
    searchTerm,
    selectedType,
    selectedOption
  );
  const client = useApolloClient();
  //apollo
  const { data, loading, error } = useQuery<GetPokemonsData>(GET_POKEMONS, {
    variables: { limit, offset },
    fetchPolicy: "network-only",
  });
  //Handlers
  const loadMore = () => setOffset((prev) => prev + limit);
  const handleResetFilter = () => setSearchTerm("");

  // Enriquecer y guardar en IndexedDB
  const enrichPokemonsWithTypes = async (
    newPokemons: Pokemon[]
  ): Promise<PokemonWithTypes[]> => {
    const promises = newPokemons.map(async (p) => {
      const existing = allPokemons.find((ap) => ap.id === p.id);
      if (existing?.types?.length) return existing;

      const dbPokemon = await db.allPokemons.get(p.id);
      if (dbPokemon) return dbPokemon;

      try {
        const res = await client.query<GetPokemonDetailsData>({
          query: GET_POKEMON_DETAILS,
          variables: { name: p.name },
          fetchPolicy: "cache-first",
        });
        const types = res.data?.pokemon?.types.map((t) => t.type.name) ?? [];
        return { ...p, types };
      } catch {
        return { ...p, types: [] };
      }
    });

    const enriched = await Promise.all(promises);

    try {
      const toSave = enriched.filter(
        (p) => !allPokemons.find((ap) => ap.id === p.id)
      );
      if (toSave.length) await db.allPokemons.bulkPut(toSave);
    } catch (err) {
      console.error("Error guardando en IndexedDB:", err);
    }

    return enriched;
  };

  //Effects
  // Cargar desde IndexedDB
  useEffect(() => {
    const loadFromDB = async () => {
      try {
        const stored = await db.allPokemons.toArray();
        if (stored.length) setAllPokemons(stored);
      } catch (err) {
        console.error(err);
      }
    };
    loadFromDB();
  }, []);

  // Enriquecer y actualizar cuando cambie la data
  useEffect(() => {
    if (!data?.pokemons.results) return;

    const newPokemons = data.pokemons.results.filter(
      (p) => !allPokemons.find((ap) => ap.id === p.id)
    );
    if (!newPokemons.length) return;

    enrichPokemonsWithTypes(newPokemons).then((enriched) => {
      setAllPokemons((prev) => [...prev, ...enriched]);
    });
  }, [data, allPokemons, enrichPokemonsWithTypes]);

  useEffect(() => {
    if (error) toast.error("Error al cargar los Pokémons, inténtalo de nuevo");
  }, [error]);
  //
  return {
    pokemons: filteredPokemons,
    loading,
    loadingSearch,
    error,
    loadMore,
    searchTerm,
    setSearchTerm,
    handleResetFilter,
    selectedOption,
    setSelectedOption,
    selectedType,
    setSelectedType,
  };
};
