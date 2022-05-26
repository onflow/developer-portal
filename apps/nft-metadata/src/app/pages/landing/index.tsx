// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CardLayout } from '../../components/home/card-layout';
import { Footer } from '@nft-metadata/ui';

function Landing() {
  return (
    <>
      <div className='h-screen'>
        <CardLayout />
      </div>
      <Footer />
    </>
  );
}

export default Landing;
