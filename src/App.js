import { Route, Switch } from "wouter";
import {Home} from './pages'
import GlobalStyles from './GlobalStyles'

function App() {
  return (
    <>
      <GlobalStyles/>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;
