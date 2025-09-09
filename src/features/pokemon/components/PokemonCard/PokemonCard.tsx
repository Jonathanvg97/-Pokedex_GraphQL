import styles from "./PokemonCard.module.css";
import type { Pokemon } from "../../../../types/pokemon";
import TypeBadge from "../TypeBadge/TypeBadge";
import Button from "../../../../components/ui/Button/Button";
import Card from "../../../../components/ui/Card/Card";

interface PokemonCardProps {
  pokemon: Pokemon;
  onViewDetails: (pokemon: Pokemon) => void;
  onAddToFavorites: (pokemon: Pokemon) => void;
  isFavorite: boolean;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onViewDetails,
  onAddToFavorites,
  isFavorite,
}) => {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <Card>
      <div className={styles.cardContent}>
        <img
          className={styles.pokemonImage}
          src={imageUrl}
          alt={pokemon.name}
        />
        <h3 className={styles.pokemonName}>{pokemon.name}</h3>
        <div className={styles.pokemonTypes}>
          {pokemon.pokemon_v2_pokemontypes.map((type, index) => (
            <TypeBadge key={index} type={type.pokemon_v2_type.name} />
          ))}
        </div>
        <div className={styles.actions}>
          <Button
            onClick={() => onViewDetails(pokemon)}
            style={{ marginRight: "10px" }}
          >
            Ver detalles
          </Button>
          <Button
            primary
            onClick={() => onAddToFavorites(pokemon)}
            disabled={isFavorite}
          >
            {isFavorite ? "En favoritos" : "Favorito"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PokemonCard;
