// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Route,
  Switch,
} from "react-router-dom";
import Catalog from "src/app/components/catalog";
import { CatalogSelect } from "src/app/components/catalog/catalog-select";

export default function Proposals() {
  return (
    <>
      <Switch>
        <Route path="/proposals/:proposalID">
          <Catalog type="Proposals"></Catalog>
        </Route>
        <Route path="/proposals">
          <Catalog type="Proposals"></Catalog>
        </Route>
      </Switch>
    </>
  );
}
