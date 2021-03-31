// tipos de tests Snapshot y testing library
// npm test -- --coverage para ver el porcentaje de test de cada componente

import {fireEvent, render, screen} from "@testing-library/react";
import Home from "./Home";
import {useFetchPokemons} from "../services/poke-api/pokemon";
import renderer from "react-test-renderer";

jest.mock("../services/poke-api/pokemon");

describe("Home", () => {
  const pokemonsResp = {
    pokemons: [
      {name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/"},
      {name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/"},
      {name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/"},
      {name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/"},
    ],
    isLoading: false,
  };
  const filteredPokemonsResp = {
    pokemons: [
      {name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/"},
      {name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/"},
    ],
    isLoading: false,
  };

  test("returns pokemon cards", () => {
    useFetchPokemons.mockReturnValue(pokemonsResp);
    render(<Home />);
    const pokemons = screen.getAllByTestId("poke-card");

    expect(pokemons).toHaveLength(pokemonsResp.pokemons.length);
    expect(useFetchPokemons.mock.calls.length).toBe(1);
  });

  test("returns loading states when is loading", () => {
    const resp = {
      isLoading: true,
    };
    useFetchPokemons.mockReturnValue(resp);
    render(<Home />);
    const pokemons = screen.queryAllByTestId("poke-card");

    expect(pokemons).toHaveLength(0);
    expect(useFetchPokemons.mock.calls.length).toBe(1);
    const tree = renderer.create(<Home />).toJSON(); // Cómo debería verse el resultado final de la página
    expect(tree).toMatchSnapshot();
  });

  test("returns query search", () => {
    useFetchPokemons
      .mockReturnValueOnce(pokemonsResp)
      .mockReturnValue(filteredPokemonsResp);
    render(<Home />);
    const search = screen.getByRole("textbox");
    const query = "char";

    expect(search).toHaveAttribute("placeholder", "Pokedex search");
    expect(screen.queryAllByTestId("poke-card")).toHaveLength(4);

    fireEvent.change(search, {target: {value: query}});
    expect(screen.queryAllByTestId("poke-card")).toHaveLength(2);
    expect(useFetchPokemons).toHaveBeenCalledWith(query);
  });
});
