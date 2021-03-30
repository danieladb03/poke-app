import {render, screen} from "@testing-library/react";
import {
  useFetchPokemons,
  useFetchPokemon,
  useFetchPokeSpecies,
} from "./pokemon";
import fetcher from "./fetcher";
import {SWRConfig} from "swr";

jest.mock("./fetcher");

// creamos componente de React para probar Hooks
const Test = ({query}) => {
  const {pokemons} = useFetchPokemons(query);
  return <div>{pokemons.map((poke) => poke.name).join(",")}</div>;
};

describe("pokemon", () => {
  describe("useFetchPokemons", () => {
    const expectedContent = "Pikachu";
    const expectedContent2 = "Charizard";
    const returnValue = {results: [{name: expectedContent}]}; // fixture
    const returnMultipleValues = {
      results: [{name: expectedContent}, {name: expectedContent2}],
    };

    test("returns response successfully", async () => {
      fetcher.mockResolvedValue(returnValue);
      render(
        <SWRConfig value={{dedupingInterval: 0}}>
          <Test />
        </SWRConfig>
      );

      expect(await screen.findByText(expectedContent)).toBeTruthy();
    });

    test("returns query search", async () => {
      fetcher.mockReset();
      fetcher.mockResolvedValue(returnMultipleValues);
      const query = "Pika";
      const {rerender} = render(
        <SWRConfig value={{dedupingInterval: 0}}>
          <Test />
        </SWRConfig>
      );

      expect(
        await screen.findByText(`${expectedContent},${expectedContent2}`)
      ).toBeTruthy();
      rerender(
        <SWRConfig value={{dedupingInterval: 0}}>
          <Test query={query} />
        </SWRConfig>
      );
      expect(await screen.findByText(expectedContent)).toBeTruthy();
    });
  });

  describe("useFetchPokemon", () => {
    const expectedPokeName = "Pikachu";
    const expectedId = 1;
    const pokemonResponse = {name: expectedPokeName};
    const TestPokemon = ({id}) => {
      const {pokemon} = useFetchPokemon(id);
      return <div>{pokemon.name}</div>;
    };

    test("returns pokemon successfully", async () => {
      fetcher.mockResolvedValue(pokemonResponse);
      render(
        <SWRConfig value={{dedupingInterval: 0}}>
          <TestPokemon id={expectedId} />
        </SWRConfig>
      );

      expect(await screen.findByText(expectedPokeName)).toBeTruthy();
      expect(fetcher).toHaveBeenCalledWith(`pokemon/${expectedId}`);
    });
  });

  describe("useFetchPokeSpecies", () => {
    const expectedPokeDesc = "Desc";
    const expectedPokeCategory = "Cat";
    const expectedId = 1;
    const pokeSpeciesResponse = {
      flavor_text_entries: expectedPokeDesc,
      genera: expectedPokeCategory,
    };
    const TestPokeSpecies = ({id}) => {
      const {pokedescription, pokecategory} = useFetchPokeSpecies(id);
      return (
        <div>
          {pokedescription} {pokecategory}
        </div>
      );
    };

    test("returns pokedescription and pokecategory", async () => {
      fetcher.mockResolvedValue(pokeSpeciesResponse);
      render(
        <SWRConfig value={{dedupingInterval: 0}}>
          <TestPokeSpecies id={expectedId} />
        </SWRConfig>
      );

      expect(
        await screen.findByText(`${expectedPokeDesc} ${expectedPokeCategory}`)
      ).toBeTruthy();
      expect(fetcher).toHaveBeenCalledWith(`pokemon-species/${expectedId}`);
    });
  });
});
