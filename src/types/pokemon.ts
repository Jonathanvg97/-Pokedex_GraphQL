// src/types/pokemon.ts
export interface PokemonType {
  name: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: PokemonType;
  }[];
}

export interface PokemonStat {
  base_stat: number;
  pokemon_v2_stat: {
    name: string;
  };
}

export interface PokemonDetails extends Pokemon {
  base_experience: number;
  pokemon_v2_pokemonstats: PokemonStat[];
  pokemon_v2_pokemonsprites: {
    sprites: string;
  }[];
}

export interface ApiResponse<T> {
  loading: boolean;
  error?: string;
  data: T;
}
