import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PokemonGrid from "../components/PokemonGrid/PokemonGrid";
import type { Pokemon } from "@/types/pokemon";

// Mock de PokemonCard
vi.mock("../components/PokemonCard/PokemonCard", () => ({
  default: ({ pokemon }: { pokemon: Pokemon }) => (
    <div data-testid="pokemon-card">{pokemon.name}</div>
  ),
}));

const mockPokemons: Pokemon[] = [
  { id: 1, name: "bulbasaur", image: "" },
  { id: 2, name: "ivysaur", image: "" },
];

describe("PokemonGrid", () => {
  it("renders no results message when pokemons array is empty", () => {
    render(<PokemonGrid pokemons={[]} />);

    expect(screen.getByText("No hay pokemones")).toBeInTheDocument();
    expect(screen.getByAltText("No results")).toBeInTheDocument();
  });

  it("renders PokemonCard components when pokemons exist", () => {
    render(<PokemonGrid pokemons={mockPokemons} />);

    const cards = screen.getAllByTestId("pokemon-card");
    expect(cards).toHaveLength(mockPokemons.length);
    expect(cards[0]).toHaveTextContent("bulbasaur");
    expect(cards[1]).toHaveTextContent("ivysaur");
  });

  test("renders skeleton cards when loading", () => {
    render(<PokemonGrid pokemons={mockPokemons} isLoading={true} />);

    const skeletons = screen.getAllByTestId("skeleton-card");
    expect(skeletons.length).toBe(mockPokemons.length);
  });
});
