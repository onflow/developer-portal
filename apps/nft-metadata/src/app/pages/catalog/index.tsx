// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as fcl from "@onflow/fcl";
import {
  Route,
  Switch,
} from "react-router-dom";
import { useCurrentUser } from "../../hooks/use-current-user";
import ContractInputs from '../../components/verifier/contract-inputs'

export function Catalog() {
  return (
    <>
      <h2>NFT Catalog</h2>
      <p>Browse all supported NFTs on the catalog.</p>
      <Switch>
      </Switch>
    </>
  );
}

export default Catalog;
