import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi, describe, it, expect, beforeEach } from "vitest";
import PokemonCard from "../components/PokemonCard/PokemonCard";

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock de useFavorites
const addToFavoritesMock = vi.fn();
const isFavoriteMock = vi.fn();

vi.mock("@/features/favorites/hooks/useFavorites", () => ({
  useFavorites: () => ({
    addToFavorites: addToFavoritesMock,
    isFavorite: isFavoriteMock,
  }),
}));

const mockPokemon = {
  id: 25,
  name: "pikachu",
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
};

describe("PokemonCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Pokemon name, number and image", () => {
    render(
      <BrowserRouter>
        <PokemonCard pokemon={mockPokemon} />
      </BrowserRouter>
    );

    expect(screen.getByText("#025")).toBeInTheDocument();
    expect(screen.getByText("pikachu")).toBeInTheDocument();

    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img.src).toContain("25.png");
    expect(img.alt).toBe("pikachu");
  });

  it("calls navigate when clicking the card", () => {
    render(
      <BrowserRouter>
        <PokemonCard pokemon={mockPokemon} />
      </BrowserRouter>
    );

    const card = screen.getByTestId("pokemon-card");
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith("/pokemon/pikachu");
  });

  it("calls addToFavorites when clicking the heart", () => {
    isFavoriteMock.mockReturnValue(false);

    render(
      <BrowserRouter>
        <PokemonCard pokemon={mockPokemon} />
      </BrowserRouter>
    );

    const heartButton = screen.getByTestId("heart-icon");
    fireEvent.click(heartButton);
    expect(addToFavoritesMock).toHaveBeenCalledWith(mockPokemon);
  });

  it("renders HeartIcon if Pokemon is favorite", () => {
    isFavoriteMock.mockReturnValue(true);

    render(
      <BrowserRouter>
        <PokemonCard pokemon={mockPokemon} />
      </BrowserRouter>
    );

    const heartIcon = screen.getByTestId("heart-icon");
    expect(heartIcon).toBeInTheDocument();
  });
});
