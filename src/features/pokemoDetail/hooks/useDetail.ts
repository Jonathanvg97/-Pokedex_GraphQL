import type { PokemonDetails } from "@/types/pokemon";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import {
  GET_POKEMON_DETAILS,
  type GetPokemonDetailsData,
} from "../../../services/queries";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useDetail = (name: string) => {
  const navigate = useNavigate();
  //
  const [detail, setDetail] = useState<PokemonDetails | null>(null);

  const { data, loading, error } = useQuery<GetPokemonDetailsData>(
    GET_POKEMON_DETAILS,
    {
      variables: { name },
      skip: name.trim() === "",
    }
  );

  if (error) {
    toast.error("Error al obtener los detalles del Pokémon, intenta de nuevo");
    navigate("/");
  }

  useEffect(() => {
    if (data?.pokemon) {
      setDetail(data.pokemon as PokemonDetails);
    }
  }, [data]);

  return {
    detail,
    loading,
    error,
  };
};
