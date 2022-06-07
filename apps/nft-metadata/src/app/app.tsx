// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Route,
  Switch
} from "react-router-dom";
import '../flow/setup';
import Catalog from "./pages/catalog";
import Home from './pages/home';
import Proposals from "./pages/proposals";
import Verifier from './pages/verifier';
import { Footer } from '@nft-metadata/ui';

export function App() {
  return (
    <>
      <div className="min-h-screen">
        <div className="pb-16">
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
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
