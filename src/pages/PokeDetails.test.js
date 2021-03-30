import {render, screen} from "@testing-library/react";
import PokeDetails from "./PokeDetails";
import {
  useFetchPokemon,
  useFetchPokeSpecies,
} from "../services/poke-api/pokemon";
import renderer from "react-test-renderer";

jest.mock("../services/poke-api/pokemon");

describe("PokeDetails", () => {
  const expectedHeight = "height";
  const expectedWeight = "weight";
  const expectedAbility = "ability";
  const expectedStat = "hp";
  const pokeResponse = {
    pokemon: {
      name: "daniela",
      img: "img",
      characteristics: {
        height: expectedHeight,
        abilities: [{ability: {name: expectedAbility}}],
        types: [{type: {name: "type"}}],
        weight: expectedWeight,
      },
      stats: [{base_stat: "38", stat: {name: expectedStat}}],
    },
  };
  const expectedDescription = "blablala";
  const expectedCategory = "category";
  const pokeDescResponse = {
    pokedescription: [
      {flavor_text: expectedDescription, language: {name: "en"}},
    ],
    pokecategory: [{language: {name: "en"}, genus: expectedCategory}],
  };

  test("returns pokemon details", () => {
    const params = {pokeId: 1};
    useFetchPokemon.mockReturnValue(pokeResponse);
    useFetchPokeSpecies.mockReturnValue(pokeDescResponse);
    render(<PokeDetails params={params} />);
    const pokeName = screen.getByText(pokeResponse.pokemon.name);

    const tree = renderer.create(<PokeDetails params={params} />).toJSON();
    expect(tree).toMatchSnapshot();

    expect(pokeName).toBeTruthy();
    expect(screen.getByText(`About ${pokeResponse.pokemon.name}`)).toBeTruthy();
    expect(screen.getByText(expectedDescription)).toBeTruthy();
    expect(screen.getByText(`${expectedHeight}"`)).toBeTruthy();
    expect(screen.getByText(`${expectedCategory}`)).toBeTruthy();
    expect(screen.getByText(`${expectedWeight} lbs`)).toBeTruthy();
    expect(screen.getByText(`${expectedAbility}`)).toBeTruthy();
    expect(screen.getByText(`${expectedStat}`)).toBeTruthy();
  });

  test("no type", () => {
    const params = {pokeId: 1};
    const resp = {
      pokemon: {
        name: "daniela",
        img: "img",
        characteristics: {
          height: expectedHeight,
          abilities: [{ability: {name: expectedAbility}}],
          types: [{type: {}}],
          weight: expectedWeight,
        },
        stats: [{base_stat: "38", stat: {name: expectedStat}}],
      },
    };
    useFetchPokemon.mockReturnValue(resp);
    useFetchPokeSpecies.mockReturnValue(pokeDescResponse);
    render(<PokeDetails params={params} />);

    const tree = renderer.create(<PokeDetails params={params} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
