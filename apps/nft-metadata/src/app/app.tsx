// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Route,
  Switch,
} from "react-router-dom";
import '../flow/setup';
import Catalog from "./pages/catalog";
import Home from './pages/home';
import Proposals from "./pages/proposals";
import Verifier from './pages/verifier';
import Landing from './pages/landing';

export function App() {
  return (
    <>
      <Switch>
        <Route path="/proposals">
          <Proposals />
        </Route>
        <Route path="/catalog">
          <Catalog />
        </Route>
        <Route path="/v">
          <Verifier />
        </Route>
        <Route path="/landing">
          <Landing />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
