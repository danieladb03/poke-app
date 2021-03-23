/* eslint-disable no-unused-vars */
import Container from "../core/Container";
import styled from "styled-components";
import Header from "../core/Header";
import PokeCard from "../core/PokeCard";
import Layout from "./Layout";
import {useFetchPokemons} from "../services/poke-api/pokemon";
import {useState} from "react";

const pokeCards = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];

const Wrapper = styled(Container)`
  width: calc(100% - 298px);
`;

const PokeCardsWrapper = styled(Container)`
  justify-content: "space-between";
  height: calc(100vh - 65px);
  padding: 55px 10px 0px 10px;
  overflow-y: auto;
`;

const Home = () => {
  const [query, setQuery] = useState("");
  const {pokemons, isLoading, isError} = useFetchPokemons(query);
  const handleChange = (event) => setQuery(event.target.value);

  return (
    <Layout>
      <Wrapper flexDirection="column">
        <Header>
          contenido
          <input type="text" name="query" onChange={handleChange} />
        </Header>
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
