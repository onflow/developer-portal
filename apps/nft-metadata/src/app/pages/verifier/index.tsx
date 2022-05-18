// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as fcl from "@onflow/fcl";
import {
  BrowserRouter,
  Route,
  Switch,
  useParams
} from "react-router-dom";
import { useCurrentUser } from "../../hooks/use-current-user";
import ContractInputs from '../../components/verifier/contract-inputs'

export function Verifier() {
  return (
    <>
      <h2>Verifier</h2>
      <p>Verify your contract is fully setup to work with Flow's metadata standard</p>
      <Switch>
        <Route path="/v/:selectedAddress/:selectedContract">
          <ContractInputs />
        </Route>
        <Route path="/v/:selectedAddress">
          <ContractInputs />
        </Route>
        <Route path="/v">
          <ContractInputs />
        </Route>
      </Switch>
    </>
  );
}

export default Verifier;
