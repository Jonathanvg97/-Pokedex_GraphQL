import useLocalStorage from "../../../hooks/useLocalStorage";
import type { Pokemon } from "../../../types/pokemon";

interface UseFavoritesResult {
  favorites: Pokemon[];
  addToFavorites: (pokemon: Pokemon) => void;
  removeFromFavorites: (pokemonId: number) => void;
  isFavorite: (pokemonId: number) => boolean;
}

export const useFavorites = (): UseFavoritesResult => {
  const [favorites, setFavorites] = useLocalStorage<Pokemon[]>("favorites", []);

  const addToFavorites = (pokemon: Pokemon) => {
    if (!favorites.some((fav) => fav.id === pokemon.id)) {
      setFavorites([...favorites, pokemon]);
    }
  };

  const removeFromFavorites = (pokemonId: number) => {
    setFavorites(favorites.filter((fav) => fav.id !== pokemonId));
  };

  const isFavorite = (pokemonId: number) => {
    return favorites.some((fav) => fav.id === pokemonId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
};
