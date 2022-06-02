import React from 'react';
import { LandingHeader } from '../../Components/LandingHeader';
import { LinkCard2Column } from '../../Components/LinkCard2Column';
import { ReactComponent as CadenceIcon } from '../../../../images/tools/tool-cadence-gradient.svg';
import { renderToStaticMarkup } from 'react-dom/server';
import { SocialLinksSignup } from '../../Components';
const svgToDataUri = (element: Parameters<typeof renderToStaticMarkup>[0]) => {
  const svgString = encodeURIComponent(renderToStaticMarkup(element));
  return `data:image/svg+xml,${svgString}`;
};
export function GettingStartedPage() {
  return (
    <main>
      <section>
        <LandingHeader
          buttonText="Button Text"
          buttonUrl="#changeme"
          callout="Featured callout here two lines"
          description="Lorem ipsum dolor sit amet proin gravida lorem ipsum dolor sit."
          gradient="getting-started"
          title="Getting Started"
        />
      </section>

      <section>
        <h2 className="text-h2">First Steps</h2>
      </section>

      <section>
        <LinkCard2Column
          buttonText="Get Started"
          buttonUrl="#changeme"
          description="Building on Flow is easy. Start building now with lorem ipsum et sigitus loranum prospitarius."
          title="Start Your Project"
          tags={['Tag', 'Lorem', 'Ipsum']}
          items={[
            {
              title: 'Title Here 1 Line Only',
              description:
                'A package used to interact with user wallets and the Flow blockchain.',
              href: 'https://www.onflow.org',
              icon: svgToDataUri(<CadenceIcon />),
            },
            {
              title: 'Internal single link example',
              description:
                'This is an example of an item with a single internal link.',
              href: '#create-non-fungible-token',
              icon: '',
            },
          ]}
        />
      </section>

      <section className="container">
        <div className="flex justify-between">
          <h2 className="text-h2">SDK's</h2>
          <a className="rounded-lg border border-primary-blue p-4 text-sm text-primary-blue">
            Learn more
          </a>
        </div>
      </section>

      <section>Recent articles and tools</section>

      <section>Explore more content</section>

      <section className="container mx-auto">
        <SocialLinksSignup />
      </section>
    </main>
  );
}
