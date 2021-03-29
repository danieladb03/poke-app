// tipos de tests Snapshot y testing library
// npm run -- --coverage para ver el porcentaje de test de cada componente

import {render, screen} from "@testing-library/react";
import Home from "./Home";
import {useFetchPokemons} from "../services/poke-api/pokemon";
import renderer from "react-test-renderer";

jest.mock("../services/poke-api/pokemon");

describe("Home", () => {
  test("returns pokemon cards", () => {
    const resp = {
      pokemons: [
        {name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/"},
        {name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/"},
        {name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/"},
        {name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/"},
      ],
      isLoading: false,
    };
    useFetchPokemons.mockReturnValue(resp);
    render(<Home />);
    const pokemons = screen.getAllByTestId("poke-card");
    expect(pokemons).toHaveLength(resp.pokemons.length);
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
    // Cómo debería verse el resultado final de la página
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
