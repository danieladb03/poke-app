/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Container from "./Container";
// import pokeImg from '../assets/profile.png';
import {Subtitle} from "./typography";
import {Link} from "wouter";

export const PokeImage = styled.img`
  width: 100%;
  height: ${(props) => props.imageHeight};
  box-sizing: border-box;
  padding: 10px;
  margin: 10px;
`;

// TODO hacer border al hacer hover sobre el pokeCard
// leer css box-sizing

const PokeCard = ({pokemon}) => {
  const urlArray = pokemon.url.split("/");
  const pokeId = urlArray[6];
  const pokeUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`;
  return (
    <Link href={`/poke-details/${pokeId}`}>
      <Container
        flexDirection="column"
        alignItems="center"
        width="20%"
        cursor="pointer"
        data-testid="poke-card"
      >
        <PokeImage src={pokeUrl} imageHeight="192px"></PokeImage>
        <Subtitle>{pokemon.name}</Subtitle>
      </Container>
    </Link>
  );
};

export default PokeCard;
