// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Catalog from "src/app/components/catalog";

export default function CatalogPage() {
  return (
    <>
      <Switch>
        <Route path="/catalog/:network/:identifier">
          <Catalog type="Catalog"></Catalog>
        </Route>
        <Route path="/catalog/:network/">
          <Catalog type="Catalog"></Catalog>
        </Route>
        <Route path="/catalog">
          <Redirect to="/catalog/mainnet" />
        </Route>
      </Switch>
    </>
  );
}
