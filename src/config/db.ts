import type { Pokemon, PokemonWithTypes } from "@/types/pokemon";
import Dexie, { type EntityTable } from "dexie";

const db = new Dexie("POKEDEX") as Dexie & {
  favoritePokemons: EntityTable<Pokemon, "id">;
  allPokemons: EntityTable<PokemonWithTypes, "id">;
};

db.version(1).stores({
  favoritePokemons: "id",
  allPokemons: "id",
});

export default db;
