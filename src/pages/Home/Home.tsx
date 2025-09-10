import { useEffect, useMemo, useState } from "react";
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
import { usePokemonTypes } from "@/features/pokemon/hooks/usePokemonsType";

const Home: React.FC = () => {
  // Local state
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  // Hooks
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
    selectedType,
    setSelectedType,
  } = usePokemons(20);

  const { typesPokemons } = usePokemonTypes();
  const navigate = useNavigate();

  // Formatear nombres de tipos
  const formattedTypes = useMemo(
    () =>
      typesPokemons.map((t) => ({
        ...t,
        label: t.name.charAt(0).toUpperCase() + t.name.slice(1),
      })),
    [typesPokemons]
  );

  // Handlers
  const toggleSortDropdown = () => setIsSortOpen((prev) => !prev);
  const toggleTypeDropdown = () => setIsTypeOpen((prev) => !prev);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);
  const handleSelectSort = (option: EnumTypeFilters) => {
    setSelectedOption(option);
    setIsSortOpen(false);
  };
  const handleSelectType = (type: string) => {
    setSelectedType(type);
    setIsTypeOpen(false);
  };

  const showNoResults = searchTerm && !loadingSearch && pokemons.length === 0;

  // Scroll infinito solo si NO hay filtro activo
  useEffect(() => {
    const handleScroll = () => {
      // ⚠️ Desactivar scroll infinito si hay filtro por nombre o tipo
      if (searchTerm || selectedType || loading) return;

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, loadMore, searchTerm, selectedType]);

  // UI
  return (
    <article className={styles.container}>
      <section className={styles.headerContainer}>
        <header className={styles.header}>
          <div className={styles.left}>
            <img className={styles.icon} src={IconPokeball} alt="Pokeball" />
            <h1 className={styles.title}>Pokédex</h1>
          </div>

          <div className={styles.topControls}>
            <Button
              className={styles.favoritesButton}
              onClick={() => navigate("/favorites")}
            >
              Ver favoritos
            </Button>

            {/* Tipo */}
            <div className={styles.customSelect}>
              <div
                className={styles.selectedOption}
                onClick={toggleTypeDropdown}
              >
                {selectedType || "Tipos"}
              </div>
              {isTypeOpen && (
                <ul className={styles.optionsList}>
                  <li onClick={() => handleSelectType("")}>Todos</li>
                  {formattedTypes.map((type) => (
                    <li
                      key={type.name}
                      onClick={() => handleSelectType(type.name)}
                    >
                      {type.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </header>

        {/* Buscador y orden */}
        <div className={styles.controls}>
          <img src={IconSearch} alt="Buscar Pokémon" />
          <input
            className={styles.input}
            type="text"
            placeholder="Search Pokemon..."
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <Button
            className={styles.button}
            onClick={toggleSortDropdown}
            style={
              selectedOption === EnumTypeFilters.NAME
                ? { textDecoration: "underline" }
                : {}
            }
          >
            {selectedOption === EnumTypeFilters.NAME ? "A" : "#"}
          </Button>

          <MenuFilter
            onChange={handleSelectSort}
            open={isSortOpen}
            setOpen={setIsSortOpen}
          />
        </div>
      </section>

      {loadingSearch && <Spinner />}

      {showNoResults ? (
        <div className={styles.noResults}>
          <img src={IconPokeball} alt="No results" />
          No hay resultados para "{searchTerm}"
          <Button onClick={handleResetFilter} className={styles.resetButton}>
            Limpiar filtro
          </Button>
        </div>
      ) : (
        <PokemonGrid pokemons={pokemons} isLoading={loading || loadingSearch} />
      )}
    </article>
  );
};

export default Home;
