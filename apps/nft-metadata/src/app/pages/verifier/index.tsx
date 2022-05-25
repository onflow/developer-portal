// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Route,
  Switch,
} from "react-router-dom";
import ContractInputs from '../../components/verifier'

export function Verifier() {
  return (
    <>
      <Switch>
        <Route path="/v/:selectedAddress/:selectedContract">
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
