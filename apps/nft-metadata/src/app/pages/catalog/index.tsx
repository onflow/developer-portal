// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Route,
  Switch,
} from "react-router-dom";
import Catalog from "src/app/components/catalog";
import { CatalogSelect } from "src/app/components/catalog/catalog-select";

export default function CatalogPage() {
  return (
    <>
      <Switch>
        <Route path="/catalog/:identifier">
          <Catalog type="Catalog"></Catalog>
        </Route>
        <Route path="/catalog">
          <Catalog type="Catalog"></Catalog>
        </Route>
      </Switch>
    </>
  );
}
