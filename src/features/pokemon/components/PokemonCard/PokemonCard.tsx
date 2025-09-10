import styles from "./PokemonCard.module.css";
import type { Pokemon } from "@/types/pokemon";
import Button from "@/components/ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { Heart, HeartIcon } from "lucide-react";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  //
  const navigate = useNavigate();
  const { addToFavorites, isFavorite } = useFavorites();

  //
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const formattedNumber = `#${pokemon?.id?.toString().padStart(3, "0")}`;
  //

  const handleViewDetails = () => {
    navigate(`/pokemon/${pokemon.name}`);
  };
  //
  return (
    <Button
      className={styles.card}
      onClick={handleViewDetails}
      data-testid="pokemon-card"
    >
      <div className={styles.cardHeader}>
        <span className={styles.pokemonNumber}>{formattedNumber}</span>
        <div
          className={styles.heartButton}
          onClick={(e) => {
            e.stopPropagation();
            addToFavorites(pokemon);
          }}
          role="button"
          data-testid="heart-icon"
        >
          {isFavorite(pokemon.id) ? <HeartIcon fill="red" /> : <Heart />}
        </div>
      </div>

      <div className={styles.cardContent}>
        <img
          className={styles.pokemonImage}
          src={imageUrl}
          alt={pokemon.name}
          loading="lazy"
        />
        <h3 className={styles.pokemonName}>{pokemon.name}</h3>
      </div>
      <div className={styles.cardFooter}></div>
    </Button>
  );
};

export default PokemonCard;
