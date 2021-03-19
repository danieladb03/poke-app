import Container from '../core/Container';
import styled from 'styled-components';
import Header from '../core/Header';
import PokeCard from '../core/PokeCard';
import Layout from './Layout';
import {useFetchPokemons} from '../services/poke-api/pokemon';

const pokeCards = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];

const Wrapper = styled(Container)`
  width: calc(100% - 298px);
`;

const PokeCardsWrapper = styled(Container)`
  justify-content: 'space-between';
  height: calc(100vh - 65px);
  padding: 55px 10px 0px 10px;
  overflow-y: auto;
  margin: 0 20px;
`;

const Home = () => {
  // input en header
  // variable que reciba el valor del input, debe ser reactiva (useState crea variables reactivas)
  // query debe estar arriba de useFetchPokemon
  // onChange hace setQuery (vuelve a renderizar todo)
  // mandar nuevo valor query a useFetchPokemon
  const {pokemons, isLoading, isError} = useFetchPokemons();
  return (
    <Layout>
      <Wrapper flexDirection="column">
        <Header>contenidoooo</Header>
        <PokeCardsWrapper flexWrap="wrap">
          {!isLoading &&
            pokemons.map((pokemon, k) => (
              <PokeCard key={k} pokemon={pokemon} />
            ))}
        </PokeCardsWrapper>
      </Wrapper>
    </Layout>
  );
};

export default Home;
