import styles from "./PokemonGrid.module.css";
import PokemonCard from "../PokemonCard/PokemonCard";
import type { Pokemon } from "@/types/pokemon";
import IconPokeball from "../../../../assets/images/pokeball.png";

interface PokemonGridProps {
  pokemons: Pokemon[];
  isLoading?: boolean;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemons, isLoading }) => {
  //
  if (pokemons.length === 0 && !isLoading) {
    return (
      <div className={styles.noResults}>
        <img src={IconPokeball} alt="No results" />
        No hay pokemones
      </div>
    );
  }
  //UI
  return (
    <div className={styles.grid}>
      {pokemons.map((pokemon) =>
        isLoading ? (
          <div key={pokemon.id} className={styles.skeletonCard}></div>
        ) : (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
          />
        )
      )}
    </div>
  );
};

export default PokemonGrid;
