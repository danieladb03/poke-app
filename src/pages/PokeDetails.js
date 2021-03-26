import styled from "styled-components";
import Layout from "./Layout";
import Container from "../core/Container";
import Header from "../core/Header";
import statsImg from "../assets/Stats.svg";
import {PokeImage} from "../core/PokeCard";
import {Subtitle, BoldSubtitle, TextContent} from "../core/typography";
import {
  useFetchPokemon,
  useFetchPokeSpecies,
} from "../services/poke-api/pokemon";
import {useMemo} from "react"; // para hacer cache de valores
import {Link} from "wouter";
import Loader from "../core/loader";

const categoryImg = "https://cdn.bulbagarden.net/upload/";
const cateogryUrls = {
  normal: "9/95/Normal_icon_SwSh.png",
  fighting: "3/3b/Fighting_icon_SwSh.png",
  flying: "b/b5/Flying_icon_SwSh.png",
  poison: "8/8d/Poison_icon_SwSh.png",
  ground: "2/27/Ground_icon_SwSh.png",
  rock: "1/11/Rock_icon_SwSh.png",
  bug: "9/9c/Bug_icon_SwSh.png",
  ghost: "0/01/Ghost_icon_SwSh.png",
  steel: "0/09/Steel_icon_SwSh.png",
  fire: "a/ab/Fire_icon_SwSh.png",
  water: "8/80/Water_icon_SwSh.png",
  grass: "a/a8/Grass_icon_SwSh.png",
  electric: "7/7b/Electric_icon_SwSh.png",
  psychic: "7/73/Psychic_icon_SwSh.png",
  ice: "1/15/Ice_icon_SwSh.png",
  dragon: "7/70/Dragon_icon_SwSh.png",
  dark: "d/d5/Dark_icon_SwSh.png",
  fairy: "c/c6/Fairy_icon_SwSh.png",
  unknown: "5/56/UnknownIC_PBR.png",
  shadow: "5/56/UnknownIC_PBR.png",
};
const getCategoryUrl = (type) => {
  if (!type) return "";
  return `${categoryImg}${cateogryUrls[type] || cateogryUrls.unknown}`;
};

const Wrapper = styled(Container)`
  width: calc(100% - 298px);
`;

const PokeDetailsWrapper = styled(Container)`
  justify-content: "space-between";
  height: calc(100vh - 65px);
  padding: 55px 10px 0px 10px;
  overflow-y: auto;
`;

const PokeCharacteristics = styled(Container)`
  width: 50%;
  background: url(${(props) => getCategoryUrl(props.type)}) no-repeat center;
  background-size: 70px 70px;
`;

const PokeStats = styled(Container)`
  width: 50%;
  background: url(${statsImg}) no-repeat center;

  ${Container} {
    .StatLabel {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 60px;
      text-align: center;
    }
  }
`;

const StatBar = styled.div`
  width: 30px;
  background-color: #f2cd3c;
  margin: 0px 20px 10px 20px;
  height: ${(props) => props.statHeight};
`;

const PokeDetails = ({params: {pokeId}}) => {
  const isLoading = true;
  const {pokemon, isLoading1, isError} = useFetchPokemon(pokeId);
  const {
    pokedescription,
    pokecategory,
    isLoading1: isLoadingDescription, // cambiando nombre de variable
  } = useFetchPokeSpecies(pokeId);
  // TODO mover al fetch
  const description = useMemo(() => {
    return pokedescription?.find((desc) => desc.language.name === "en")
      ?.flavor_text;
  }, [pokedescription]);
  const category = useMemo(() => {
    return pokecategory?.find((cate) => cate.language.name === "en")?.genus;
  }, [pokecategory]);
  console.log("Pokemon", pokemon);
  console.log("description", description);
  console.log("category", category);
  return (
    <Layout>
      <Wrapper flexDirection="column">
        <Header>
          <Container justifyContent="flex-end" alignItems="center">
            <Link href="/">
              <span class="material-icons md-light">arrow_back</span>
            </Link>
          </Container>
        </Header>
        <PokeDetailsWrapper flexWrap="wrap">
          <Container
            style={{width: "50%"}}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Loader
              isLoading={isLoading}
              width={200}
              height={200}
              style={{marginBottom: "10px"}}
            >
              <PokeImage
                src={pokemon.img}
                alt="Poke img"
                imageHeight="170px"
              ></PokeImage>
            </Loader>
            <Loader
              isLoading={isLoading}
              width={200}
              height={16}
              style={{marginBottom: "10px"}}
            >
              <BoldSubtitle color="#000000" textTransform="capitalize">
                {pokemon.name}
              </BoldSubtitle>
            </Loader>
          </Container>
          <Container
            style={{width: "50%"}}
            flexDirection="column"
            justifyContent="center"
          >
            <Container
              flexDirection="column"
              justifyContent="center"
              margin="0px 60px"
            >
              <Loader
                isLoading={isLoading}
                width={200}
                height={16}
                style={{marginBottom: "10px"}}
              >
                <BoldSubtitle
                  color="#000000"
                  textTransform="capitalize"
                  margin="15px 0px"
                >
                  About {pokemon.name}
                </BoldSubtitle>
              </Loader>
              <Loader
                isLoading={isLoading}
                width={400}
                height={32}
                style={{marginBottom: "10px"}}
              >
                <TextContent color="#000000">{description}</TextContent>
              </Loader>
            </Container>
          </Container>
          <PokeCharacteristics
            alignItems="center"
            flexWrap="wrap"
            justifyContent="center"
            type={
              pokemon?.characteristics?.types &&
              pokemon.characteristics.types[0].name
            }
          >
            <Container
              width="60%"
              height="80%"
              alignItems="center"
              flexWrap="wrap"
            >
              <Container
                style={{width: "50%"}}
                flexDirection="column"
                alignItems="center"
              >
                <Loader
                  isLoading={isLoading}
                  width={70}
                  height={14}
                  style={{marginBottom: "10px"}}
                >
                  <Subtitle color="#787878">Height:</Subtitle>
                </Loader>
                <Loader
                  isLoading={isLoading}
                  width={70}
                  height={14}
                  style={{marginBottom: "10px"}}
                >
                  <Subtitle color="#787878">
                    {pokemon.characteristics.height}"
                  </Subtitle>
                </Loader>
              </Container>
              <Container
                style={{width: "50%"}}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Loader
                  isLoading={isLoading}
                  width={70}
                  height={14}
                  style={{marginBottom: "10px"}}
                >
                  <Subtitle color="#787878">Category:</Subtitle>
                </Loader>
                <Loader
                  isLoading={isLoading}
                  width={70}
                  height={14}
                  style={{marginBottom: "10px"}}
                >
                  <Subtitle color="#787878">{category}</Subtitle>
                </Loader>
              </Container>
              <Container
                style={{width: "50%"}}
                flexDirection="column"
                alignItems="center"
              >
                <Loader
                  isLoading={isLoading}
                  width={70}
                  height={14}
                  style={{marginBottom: "10px"}}
                >
                  <Subtitle color="#787878">Weight:</Subtitle>
                </Loader>
                <Loader
                  isLoading={isLoading}
                  width={70}
                  height={14}
                  style={{marginBottom: "10px"}}
                >
                  <Subtitle color="#787878">
                    {pokemon.characteristics.weight} lbs
                  </Subtitle>
                </Loader>
              </Container>
              <Container
                style={{width: "50%"}}
                flexDirection="column"
                alignItems="center"
              >
                <Loader
                  isLoading={isLoading}
                  width={70}
                  height={14}
                  style={{marginBottom: "10px"}}
                >
                  <Subtitle color="#787878">Abilities:</Subtitle>
                </Loader>
                <Loader
                  isLoading={isLoading}
                  width={70}
                  height={14}
                  style={{marginBottom: "10px"}}
                >
                  {!isLoading &&
                    pokemon.characteristics.abilities.map((ability, k) => (
                      <Subtitle
                        key={k}
                        color="#787878"
                        textTransform="capitalize"
                      >
                        {ability.ability.name}
                      </Subtitle>
                    ))}
                </Loader>
              </Container>
            </Container>
          </PokeCharacteristics>
          <PokeStats
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
          >
            <Container
              style={{width: "400px", height: "140px"}}
              alignItems="flex-end"
              justifyContent="center"
            >
              <Loader
                isLoading={isLoading}
                width={70}
                height={14}
                style={{marginBottom: "10px"}}
              >
                {!isLoading &&
                  pokemon.stats.map((stat, k) => (
                    <Container
                      key={k}
                      flexDirection="column"
                      alignItems="center"
                    >
                      <StatBar statHeight={`${stat.base_stat}px`}></StatBar>
                      <BoldSubtitle
                        className="StatLabel"
                        color="#787878"
                        textTransform="capitalize"
                      >
                        {stat.stat.name}
                      </BoldSubtitle>
                    </Container>
                  ))}
              </Loader>
            </Container>
          </PokeStats>
        </PokeDetailsWrapper>
      </Wrapper>
    </Layout>
  );
};

export default PokeDetails;
