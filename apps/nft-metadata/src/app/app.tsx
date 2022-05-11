// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Route,
  Link
} from "react-router-dom";
import Home from '../pages/home';
import Verifier from '../pages/verifier';

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/verifier",
    component: Verifier
  },
]

export function App() {
  return (
    <>
      <Verifier />
    </>
  );
}

export default App;
