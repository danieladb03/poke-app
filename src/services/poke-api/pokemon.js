import useSWR from 'swr';
import fetcher from './fetcher';

export const useFetchPokemons = () => {
  const {data, error} = useSWR('pokemon?limit=151', fetcher);

  // include query param con default vacio
  // useState para crear filteredPokemons
  // useEffect se va a llamar cuando el query cambie
  //    filtrar data, validar que data no sea null
  //    resultado setear a filteredPokemons
  // en lugar de devolver data devolver filteredPokemons

  return {
    pokemons: data?.results,
    isLoading: !error && !data,
    isError: error,
  };
};
