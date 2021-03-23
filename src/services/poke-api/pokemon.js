import useSWR from "swr";
import fetcher from "./fetcher";
import {useEffect, useState} from "react";
import Fuse from "fuse.js";

export const useFetchPokemons = (query = "") => {
  const {data, error} = useSWR("pokemon?limit=151", fetcher);
  const [filteredPokemons, setFilteredPokemons] = useState(data?.results);
  useEffect(() => {
    const fuseSearch = ({pokemons}) => {
      const options = {
        keys: ["name", "url"],
        threshold: 0.3,
      };
      const fuse = new Fuse(pokemons, options);
      return fuse.search(query).map(({item}) => item);
    };
    setFilteredPokemons(
      // query === "" ? data?.results : data?.results.filter(callback)
      query === "" ? data?.results : fuseSearch({pokemons: data?.results})
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
