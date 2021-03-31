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

  return {
    pokemons: filteredPokemons || [],
    isLoading: !error && !data,
    isError: error,
  };
};

// TODO incluir el useFetchPokemonSpecies en el resultado
export const useFetchPokemon = (id) => {
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  const {data, error} = useSWR(`pokemon/${id}`, fetcher);

  return {
    pokemon: {
      name: data?.name,
      img,
      stats: data?.stats,
      characteristics: {
        height: data?.height,
        weight: data?.weight,
        abilities: data?.abilities,
        types: data?.types,
      },
    },
    isLoading: !error && !data,
    isError: error,
  };
};

// TODO mover a su propio archivo endpoint 'poke-species'
export const useFetchPokeSpecies = (id) => {
  const {data, error} = useSWR(`pokemon-species/${id}`, fetcher);

  return {
    pokedescription: data?.flavor_text_entries,
    pokecategory: data?.genera,
    isLoading: !error && !data,
  };
};
