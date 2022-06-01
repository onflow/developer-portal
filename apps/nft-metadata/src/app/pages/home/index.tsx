// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CardLayout } from '../../components/home/card-layout';
import { HeaderLayout } from '../../components/home/header-layout';
import { Footer } from '@nft-metadata/ui';

function Home() {
  return (
    <>
      <HeaderLayout />
      <CardLayout />
      <Footer />
    </>
  );
}

export default Home;
