import React from 'react';
import {
  Footer,
  CalloutWithImage,
  SocialLinksSignup,
  Callout,
} from '../../Components';

export type NetworkDetailPageProps = {
  networkName: string;
};

const NetworkDetailPage = () => {
  return (
    <div className="w-ful">
      <div className="flex-col items-center">
        <h1 className="text-center text-h1">Network name</h1>
        <div style={{ height: '100px' }}></div>

        <div className="self-center mb-36">
          <CalloutWithImage
            heading="Node operator callout"
            description="Everything you need to start building on Flow verything you need to start building on Flow everything you need to start building on Flow"
            ctaText="Learn more"
            ctaLink="https://flow.com"
            image="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            imageAltText="Github"
          />
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
