import React from 'react';
import {
  Footer,
  FeaturedArticleSlider,
  SocialLinksSignup,
  Callout,
  TabMenu
} from '../../Components';
import { Article } from '../../interfaces';

export type NetworkDetailPageProps = {
  networkName: string;
};

const NetworkDetailPage = () => {
  const article = {
    heading:"Node operator callout",
    description:"Everything you need to start building on Flow verything you need to start building on Flow everything you need to start building on Flow",
    ctaText:"Learn more",
    ctaLink:"https://flow.com",
    imageUrl:"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
  } as Article;

  return (
    <div className="w-full">
      <div className="flex-col items-center">
        <TabMenu tabs={['Mainnet', 'Testnet', 'Canary']} />
        <h1 className="text-center text-h1 my-[100px]">Network name</h1>

        <div className="self-center mb-36">
          <FeaturedArticleSlider articles={[article]} />
        </div>

        <div className="self-center mb-36">
          <Callout
            heading="Spork FAQ"
            description="Lorem ipsum dolor sit amet proin gravida lorem ipsum"
            ctaText="View FAQ"
            ctaLink="https://flow.com"
          />
        </div>

        <div className="my-24 xs:h-[57rem] md:h-[42rem]">
          <SocialLinksSignup />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default NetworkDetailPage;
