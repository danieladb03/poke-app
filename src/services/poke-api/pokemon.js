import useSWR from "swr";
import fetcher from "./fetcher";
import {useEffect, useState} from "react";

export const useFetchPokemons = (query = "") => {
  const {data, error} = useSWR("pokemon?limit=151", fetcher);
  const [filteredPokemons, setFilteredPokemons] = useState(data?.results);
  useEffect(() => {
    const callback = (pokemon) => new RegExp(query).test(pokemon.name);
    setFilteredPokemons(
      query === "" ? data?.results : data?.results.filter(callback)
    );
  }, [query, data]);

  // include query param con default vacio
  // useState para crear filteredPokemons
  // useEffect se va a llamar cuando el query cambie
  //    filtrar data, validar que data no sea null
  //    resultado setear a filteredPokemons
  // en lugar de devolver data devolver filteredPokemons

  return {
    pokemons: filteredPokemons || [],
    isLoading: !error && !data,
    isError: error,
  };
};
