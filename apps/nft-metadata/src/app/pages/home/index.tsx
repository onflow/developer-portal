// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <h2>Home</h2>
      <Link to={'/v'}>NFT Metadata Verifier</Link>
      <br />
      <Link to={'/catalog'}>NFT Catalog</Link>
      <br />
      <Link to={'/proposals'}>NFT Catalog Proposals</Link>
    </>
  );
}

export default Home;
