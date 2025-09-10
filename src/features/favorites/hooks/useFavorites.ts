import { useEffect, useState } from "react";
import type { Pokemon } from "@/types/pokemon";
import db from "@/config/db";

interface UseFavoritesResult {
  favorites: Pokemon[];
  addToFavorites: (pokemon: Pokemon) => Promise<void>;
  isFavorite: (pokemonId: number) => boolean;
  loading: boolean;
}

export const useFavorites = (): UseFavoritesResult => {
  //
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Cargar favoritos iniciales desde IndexedDB
  useEffect(() => {
    const loadFavorites = async () => {
      const stored = await db.favoritePokemons.toArray();
      setFavorites(stored);
      setLoading(false);
    };
    loadFavorites();
  }, []);

  const addToFavorites = async (pokemon: Pokemon) => {
    const exists = await db.favoritePokemons.get(pokemon.id);
    if (!exists) {
      await db.favoritePokemons.add(pokemon);
      setFavorites((prev) => [...prev, pokemon]);
    } else {
      await db.favoritePokemons.delete(pokemon.id);
      setFavorites((prev) => prev.filter((fav) => fav.id !== pokemon.id));
    }
  };

  const isFavorite = (pokemonId: number) => {
    return favorites.some((fav) => fav.id === pokemonId);
  };

  return {
    favorites,
    addToFavorites,
    isFavorite,
    loading,
  };
};
