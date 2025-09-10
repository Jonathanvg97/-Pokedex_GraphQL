import type { Pokemon } from "@/types/pokemon";
import Dexie, { type EntityTable } from "dexie";

const db = new Dexie("POKEDEX") as Dexie & {
  favoritePokemons: EntityTable<Pokemon, "id">;
};

db.version(1).stores({
  favoritePokemons: "id",
});

export default db;
