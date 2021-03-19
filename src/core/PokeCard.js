import styled from 'styled-components';
import Container from './Container';
import pokeImg from '../assets/profile.png';
import {Subtitle} from './typography';

const PokeImage = styled.img`
  width: 100%;
  height: 192px;
  box-sizing: border-box;
  padding: 10px;
  margin: 10px;
`;

const PokeCard = ({pokemon}) => {
  const urlArray = pokemon.url.split('/');
  const pokeId = urlArray[6];
  console.log(urlArray);
  const pokeUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`;
  return (
    <Container
      style={{width: '20%'}}
      flexDirection="column"
      alignItems="center"
    >
      <PokeImage src={pokeUrl}></PokeImage>
      <Subtitle>{pokemon.name}</Subtitle>
    </Container>
  );
};

export default PokeCard;
