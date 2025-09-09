import styles from "./PokemonGrid.module.css";
import PokemonCard from "../PokemonCard/PokemonCard";
import type { Pokemon } from "../../../../types/pokemon";

interface PokemonGridProps {
  pokemons: Pokemon[];
  onViewDetails: (pokemon: Pokemon) => void;
  onAddToFavorites: (pokemon: Pokemon) => void;
  isFavorite: (pokemonId: number) => boolean;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({
  pokemons,
  onViewDetails,
  onAddToFavorites,
  isFavorite,
}) => {
  if (pokemons.length === 0) {
    return <div className={styles.noResults}>No se encontraron Pokémon</div>;
  }

  return (
    <div className={styles.grid}>
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onViewDetails={onViewDetails}
          onAddToFavorites={onAddToFavorites}
          isFavorite={isFavorite(pokemon.id)}
        />
      ))}
    </div>
  );
};

export default PokemonGrid;
