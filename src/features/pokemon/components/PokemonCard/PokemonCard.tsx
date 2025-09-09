import styles from "./PokemonCard.module.css";
import type { Pokemon } from "@/types/pokemon";
import Button from "@/components/ui/Button/Button";
import { useNavigate } from "react-router-dom";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  //
  const navigate = useNavigate();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  //
  const handleViewDetails = (pokemon: Pokemon) => {
    navigate(`/pokemon/${pokemon.name}`);
  };
  // Formatear el número del Pokémon con 3 dígitos
  const formattedNumber = `#${pokemon?.id?.toString().padStart(3, "0")}`;
  //
  return (
    <Button className={styles.card} onClick={() => handleViewDetails(pokemon)}>
      <span className={styles.pokemonNumber}>{formattedNumber}</span>

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
