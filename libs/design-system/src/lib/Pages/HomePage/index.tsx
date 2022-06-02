import React from 'react';
import {
  LandingHeaderHome,
  SocialLinksSignup,
  Footer,
  LinkCard2Column,
  LinkCard3Column,
} from '../../Components';
import { ReactComponent as UseCaseIcon } from '../../../../images/content/use-cases.svg';
import { ReactComponent as EcosystemIcon } from '../../../../images/content/ecosystem.svg';
import { ReactComponent as SDKIcon } from '../../../../images/content/sdk.svg';
import { LinkCard3ColumnItemProps } from '../../Components/LinkCard3Column';

const HomePage = () => {
  const threeColumnItems: LinkCard3ColumnItemProps[] = [
    {
      title: 'Quickstart',
      description:
        'A package used to interact with user wallets and the Flow blockchain.',
      icon: <UseCaseIcon />,
      links: [
        {
          title: 'Quickstart tutorial',
          href: '#tutorial1',
          tags: ['tutorial'],
        },
        {
          title: 'Name of a tutorial',
          href: '#tutorial2',
          tags: ['tutorial'],
        },
        {
          title: 'Name of another tutorial',
          href: '#tutorial3',
          tags: ['tutorial'],
        },
      ],
    },
    {
      title: 'Guides & Tutorials',
      description:
        'An up to 3-line blurb here describing the section lorem ipsum dolor sit amet proin.',
      icon: <EcosystemIcon />,
      links: [
        {
          title: 'Guide 1',
          href: '#tutorial1',
          tags: ['tutorial'],
        },
        {
          title: 'Guide 2',
          href: '#tutorial2',
        },
        {
          title: 'An external link',
          href: 'https://www.onflow.org',
          tags: ['tutorial', 'external'],
        },
      ],
    },
    {
      title: 'Smart Contracts',
      description: 'Smart contracts description.',
      icon: <SDKIcon />,
      links: [
        {
          title: 'Name of a Smart Contract tutorial',
          href: '#tutorial1',
          tags: ['tutorial'],
        },
        {
          title: 'Name of a tutorial',
          href: '#tutorial2',
          tags: ['tag1', 'tag2', 'tag3', 'tag4'],
        },
        {
          title: "View all SDK's",
          href: '#sdks',
        },
      ],
    },
  ];

  return (
    <div>
      <LandingHeaderHome
        title="Developer Portal"
        description="Understand the foundational concepts of Flow and its language, Cadence"
        tag="onflow"
      />

      <LinkCard2Column
        buttonText="Get started"
        buttonUrl="#"
        title="Start your project"
        items={[]}
        description="Everything you need to start building on Flow is lorem ipsum Everything you need to orem ipsum Everything you need to  "
      />

      <LinkCard3Column items={threeColumnItems} />

      <div className="my-24">
        <SocialLinksSignup />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
