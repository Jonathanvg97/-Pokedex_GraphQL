// src/features/pokemon/components/PokemonDetail/PokemonDetail.tsx
import React from "react";
import styles from "./PokemonDetail.module.css";
import Card from "../../../../components/ui/Card/Card";
import Button from "../../../../components/ui/Button/Button";
import TypeBadge from "../TypeBadge/TypeBadge";
import type { Pokemon } from "../../../../types/pokemon";

interface PokemonDetailProps {
  pokemon: Pokemon;
  onClose: () => void;
  onAddToFavorites: (pokemon: Pokemon) => void;
  isFavorite: boolean;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({
  pokemon,
  onClose,
  onAddToFavorites,
  isFavorite,
}) => {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <Card className={styles.detailContainer}>
      <Button onClick={onClose} className={styles.backButton}>
        ← Volver
      </Button>

      <div className={styles.detailHeader}>
        <img
          className={styles.pokemonImage}
          src={imageUrl}
          alt={pokemon.name}
        />
        <div className={styles.pokemonInfo}>
          <h2 className={styles.pokemonName}>{pokemon.name}</h2>
          <div className={styles.pokemonTypes}>
            {pokemon.pokemon_v2_pokemontypes.map((type, index) => (
              <TypeBadge key={index} type={type.pokemon_v2_type.name} />
            ))}
          </div>
          <p>Altura: {(pokemon.height / 10).toFixed(1)} m</p>
          <p>Peso: {(pokemon.weight / 10).toFixed(1)} kg</p>
          <Button
            primary
            onClick={() => onAddToFavorites(pokemon)}
            disabled={isFavorite}
            className={styles.favoriteButton}
          >
            {isFavorite ? "En favoritos" : "Agregar a favoritos"}
          </Button>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <h3>Estadísticas base:</h3>
        {"pokemon_v2_pokemonstats" in pokemon && (
          <div className={styles.stats}>
            {pokemon.pokemon_v2_pokemonstats.map((stat, index) => (
              <div key={index} className={styles.statRow}>
                <span className={styles.statLabel}>
                  {stat.pokemon_v2_stat.name}:
                </span>
                <span>{stat.base_stat}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default PokemonDetail;
