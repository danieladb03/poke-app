import {Route, Switch} from "wouter";
import {Home, PokeDetails} from "./pages";
import GlobalStyles from "./GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/poke-details/:pokeId" component={PokeDetails} />
      </Switch>
    </>
  );
}

export default App;
