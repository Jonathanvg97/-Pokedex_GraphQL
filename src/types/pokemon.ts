export interface Pokemon {
  id: number;
  name: string;
  image: string;
}
export interface PokemonWithTypes extends Pokemon {
  types?: string[];
}
export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonDetails extends Pokemon {
  height: number;
  weight: number;
  base_experience: number;
  types: [
    {
      type: {
        name: string;
      };
    }
  ];
  stats: PokemonStat[];
}

export interface PokemonType {
  id: number;
  name: string;
}

export interface ApiResponse<T> {
  loading: boolean;
  error?: string;
  data: T;
}

export enum EnumTypeFilters {
  NUMBER = "number",
  NAME = "name",
}
