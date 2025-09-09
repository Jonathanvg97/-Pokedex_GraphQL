export interface PokemonType {
  name: string;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonDetails extends Pokemon {
  base_experience: number;
  stats: PokemonStat[];
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
