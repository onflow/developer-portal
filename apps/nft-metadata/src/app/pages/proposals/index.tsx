// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Catalog from "src/app/components/catalog";

export default function Proposals() {
  return (
    <>
      <Switch>
        <Route path="/proposals/:network/:identifier">
          <Catalog type="Proposals"></Catalog>
        </Route>
        <Route path="/proposals/:network">
          <Catalog type="Proposals"></Catalog>
        </Route>
        <Route path="/proposals">
          <Redirect to="/proposals/mainnet" />
        </Route>
      </Switch>
    </>
  );
}
