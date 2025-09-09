import { useState, useMemo } from "react";
import styles from "./Home.module.css";
import {
  usePokemons,
  usePokemonTypes,
  useSearchPokemons,
} from "../../features/pokemon/services/pokemonApi";
import type { SelectOption } from "../../types/ui";
import type { Pokemon } from "../../types/pokemon";
import Input from "../../components/ui/Input/Input";
import Select from "../../components/ui/Select/Select";
import Tabs from "../../components/ui/Tabs/Tabs";
import PokemonDetail from "../../features/pokemon/components/PokemonDetail/PokemonDetail";
import PokemonGrid from "../../features/pokemon/components/PokemonGrid/PokemonGrid";
import Button from "../../components/ui/Button/Button";
import { useFavorites } from "../../features/favorites/hooks/useFavorites";

const Home: React.FC = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [offset, setOffset] = useState<number>(0);
  const limit = 20;

  const { loading, error, pokemons, fetchMore } = usePokemons(limit, offset);
  const { types } = usePokemonTypes();
  const { searchResults, loading: searchLoading } =
    useSearchPokemons(searchTerm);
  const { favorites, addToFavorites, isFavorite } = useFavorites();

  const typeOptions: SelectOption[] = useMemo(
    () => [
      { value: "all", label: "Todos los tipos" },
      ...types.map((type) => ({ value: type.name, label: type.name })),
    ],
    [types]
  );

  const filteredPokemons = useMemo(() => {
    let filtered = activeTab === "favorites" ? favorites : pokemons;

    if (searchTerm && searchTerm.length >= 3) {
      filtered = searchResults;
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((pokemon) =>
        pokemon.pokemon_v2_pokemontypes.some(
          (type) => type.pokemon_v2_type.name === selectedType
        )
      );
    }

    return filtered;
  }, [pokemons, favorites, activeTab, searchTerm, searchResults, selectedType]);

  const handleViewDetails = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseDetails = () => {
    setSelectedPokemon(null);
  };

  const handleLoadMore = () => {
    const newOffset = offset + limit;
    fetchMore({
      variables: { offset: newOffset },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prev;
        return {
          pokemon_v2_pokemon: [
            ...prev.pokemon_v2_pokemon,
            ...fetchMoreResult.pokemon_v2_pokemon,
          ],
        };
      },
    });
    setOffset(newOffset);
  };

  if (error)
    return <div className={styles.errorMessage}>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Pokédex</h1>
        <div className={styles.controls}>
          <Input
            type="text"
            placeholder="Buscar Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            options={typeOptions}
          />
        </div>
      </header>

      <Tabs
        tabs={[
          { id: "all", label: "Todos" },
          { id: "favorites", label: `Favoritos (${favorites.length})` },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {selectedPokemon ? (
        <PokemonDetail
          pokemon={selectedPokemon}
          onClose={handleCloseDetails}
          onAddToFavorites={addToFavorites}
          isFavorite={isFavorite(selectedPokemon.id)}
        />
      ) : (
        <>
          {(loading || searchLoading) && offset === 0 ? (
            <div className={styles.loading}>Cargando Pokémon...</div>
          ) : (
            <>
              <PokemonGrid
                pokemons={filteredPokemons}
                onViewDetails={handleViewDetails}
                onAddToFavorites={addToFavorites}
                isFavorite={isFavorite}
              />
              {activeTab === "all" && !searchTerm && (
                <div className={styles.loadMoreContainer}>
                  <Button onClick={handleLoadMore} disabled={loading}>
                    {loading ? "Cargando..." : "Cargar más"}
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
