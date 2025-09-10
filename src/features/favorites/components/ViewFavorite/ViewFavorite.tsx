import Button from "@/components/ui/Button/Button";
import styles from "./ViewFavorite.module.css";
import BackIcon from "@/assets/icons/backIcon.png";
import { useNavigate } from "react-router-dom";
import PokemonGrid from "@/features/pokemon/components/PokemonGrid/PokemonGrid";
import { useFavorites } from "../../hooks/useFavorites";

export const ViewFavorite = () => {
  //
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  //
  return (
    <article className={styles.container}>
      <section>
        <Button onClick={() => navigate(-1)} className={styles.backButton}>
          <img src={BackIcon} alt="back" />
        </Button>
        <h1>Mis favoritos</h1>
      </section>
      <PokemonGrid pokemons={favorites} />
    </article>
  );
};
