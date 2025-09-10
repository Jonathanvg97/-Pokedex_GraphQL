import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import PokemonGrid from "@/features/pokemon/components/PokemonGrid/PokemonGrid";
import Button from "@/components/ui/Button/Button";
import { usePokemons } from "@/features/pokemon/hooks/usePokemons";
import IconPokeball from "../../assets/images/pokeball.png";
import IconSearch from "../../assets/icons/search.png";
import Spinner from "@/components/ui/Spinner/Spinner";
import { MenuFilter } from "@/features/pokemon/components/MenuFilter/MenuFilter";
import { EnumTypeFilters } from "@/types/pokemon";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  //local states
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //Hook
  const {
    pokemons,
    loading,
    loadMore,
    searchTerm,
    setSearchTerm,
    handleResetFilter,
    loadingSearch,
    selectedOption,
    setSelectedOption,
  } = usePokemons(20);
  const navigate = useNavigate();
  //Handlers
  const handleSelect = (option: EnumTypeFilters) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  // Detectar scroll al final de la página
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, loadMore]);
  //UI
  return (
    <article className={styles.container}>
      <section className={styles.headerContainer}>
        <header className={styles.header}>
          <div className={styles.left}>
            <img className={styles.icon} src={IconPokeball} alt="Pokeball" />
            <h1 className={styles.title}>Pokédex</h1>
          </div>
          <Button
            className={styles.favoritesButton}
            onClick={() => navigate("/favorites")}
          >
            Ver favoritos
          </Button>
        </header>

        <div className={styles.controls}>
          <img src={IconSearch} alt="Buscar Pokémon" />
          <input
            className={styles.input}
            type="text"
            placeholder="Search Pokemon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button
            className={styles.button}
            onClick={() => setIsOpen((prev) => !prev)}
            style={
              selectedOption === EnumTypeFilters.NAME
                ? { textDecoration: "underline" }
                : {}
            }
          >
            {selectedOption === EnumTypeFilters.NAME ? "A" : "#"}
          </Button>

          <MenuFilter
            onChange={handleSelect}
            open={isOpen}
            setOpen={setIsOpen}
          />
        </div>
      </section>

      {loadingSearch && <Spinner />}

      {searchTerm && !loadingSearch && pokemons.length === 0 ? (
        <div className={styles.noResults}>
          <img src={IconPokeball} alt="No results" />
          No hay resultados para "{searchTerm}"
          <Button onClick={handleResetFilter} className={styles.resetButton}>
            limpiar filtro
          </Button>
        </div>
      ) : (
        <PokemonGrid pokemons={pokemons} isLoading={loading || loadingSearch} />
      )}
    </article>
  );
};

export default Home;
