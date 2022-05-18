// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as fcl from "@onflow/fcl";
import {
  Route,
  Switch,
} from "react-router-dom";
import { useCurrentUser } from "../../hooks/use-current-user";
import ContractInputs from '../../components/verifier/contract-inputs'

export function Proposals() {
  return (
    <>
      <h2>NFT Proposals</h2>
      <p>View + Accept + Reject proposed additions and updates to the NFT Catalog</p>
      <Switch>
      </Switch>
    </>
  );
}

export default Proposals;
