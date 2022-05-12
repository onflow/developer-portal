// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as fcl from "@onflow/fcl";
import { useCurrentUser } from "../../hooks/use-current-user";
import ContractInputs from '../../components/verifier/contract-inputs'

export function Verifier() {
  const [user, loggedIn] = useCurrentUser()
  return (
    <>
      <h2>Verifier</h2>
      <p>Verify your contract's validity</p>
      <ContractInputs />
    </>
  );
}

export default Verifier;
