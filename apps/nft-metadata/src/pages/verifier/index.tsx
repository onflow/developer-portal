// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as fcl from "@onflow/fcl";
import { useCurrentUser } from "../../hooks/use-current-user";

export function Verifier() {
  const [user, loggedIn] = useCurrentUser()
  return (
    <>
      <h2>Verifier</h2>
      <br/>
      <button onClick={() => {
        fcl.authenticate()
      }}>
        Log in
      </button>
      <br/>
      Logged in as {user}
    </>
  );
}

export default Verifier;
