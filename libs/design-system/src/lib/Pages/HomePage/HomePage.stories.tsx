import React from "react"
import { Meta, Story } from '@storybook/react';
import HomePage, { HomePageProps } from '.';
import { ReactComponent as UseCaseIcon } from '../../../../images/content/use-cases.svg';
import { ReactComponent as EcosystemIcon } from '../../../../images/content/ecosystem.svg';
import { ReactComponent as SDKIcon } from '../../../../images/content/sdk.svg';
import KittyItemsImg from '../../../../images/content/kitty-items@3x.png';
import DappyImg from '../../../../images/content/dappy@3x.png';

export default {
  component: HomePage,
  title: 'Pages/HomePage',
} as Meta;

const Template: Story<HomePageProps> = (args) => <HomePage {...args} />;
const startProjectItems = {
  buttonText: 'Get started',
  buttonUrl: '#changeme',
  description:
    'Building on Flow is easy. Start building now with lorem ipsum et sigitus loranum prospitarius.',
  title: 'Start Your Project',
  tags: ['Tutorial'],
  items: [
    {
      title: 'Crypto Dappy Course',
      description:
        'A package used to interact with user wallets and the Flow blockchain.',
      href: '#',
      icon: DappyImg,
    },
    {
      title: 'Create an NFT',
      description:
        'A series of tutorials that explain how to build your first NFT (Non-Fungible Token)',
      href: '#create-non-fungible-token',
      icon: KittyItemsImg,
      links: [
        { href: '#', title: 'Dictionaries' },
        { href: '#', title: 'Path Finder for NFTs' },
      ],
    },
  ],
};

const flips = Array(3).fill({
  numComments: 23,
  heading: 'Error Subscribing to Events in Default Docs',
  tags: ['moo', 'crab', 'rangoon'],
  participant: {
    profileImage:
      'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    name: 'Marky Mark',
  },
  date: '23/3/22',
  forumLink: '#test',
});

const tools = Array(6).fill({
  title: 'Flow Port',
  authorIcon: 'https://avatars.githubusercontent.com/u/62387156?s=64&v=4',
  authorName: 'mini flow',
  tags: ['Tags'],
  link: '#',
  stars: 52,
  toolIcon:
    'https://cdn4.iconfinder.com/data/icons/logos-3/504/Swift-2-512.png',
  description:
    'Lorem ipsum text here can go a two liner sentence or a one liner',
});

const threeColumnItems = [
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
const upcomingEvents = {
  officeHours: <p>[office hours placeholder]</p>,
  workingHours: <p>[working hours placeholder]</p>,
  goToCommunityHref: '#todo',
  submitEventHref: '#todo',
  primaryEvents: Array(3).fill({
    ctaText: 'CTA Here',
    description:
      'Everything you need to start building on Flow verything you need to start building on Flow everything you need to start building on Flow',
    eventDate: 'Mar 23',
    href: '#todo',
    imageSrc:
      'https://assets.website-files.com/5f6294c0c7a8cdf432b1c827/61689102d3325e237fd44b76_unnamed%20(8).png',
    location: 'Online',
    tags: ['Flow official'],
    title: 'Event Title',
  }),
  secondaryEvents: Array(5).fill({
    href: 'https://www.onflow.org',
    eventType: 'Online',
    imageSrc:
      'https://assets.website-files.com/5f6294c0c7a8cdf432b1c827/61410bc0c8d0522eea319058_Hack-blog_Flow.png',
    tags: ['Flow official'],
    title: 'FLIP contest',
    when: 'May 5th, 5pm',
  }),
};

const args = {
  startProjectItems,
  flips,
  tools,
  threeColumnItems,
  upcomingEvents,
};
export const Default = Template.bind({});
Default.args = args;

export const dark = Template.bind({});
dark.args = args;
dark.parameters = {
  themes: {
    default: 'dark',
  },
};

export const mobile = Template.bind({});
mobile.args = args;
mobile.parameters = {
  viewport: {
    defaultViewport: 'xs',
  },
};
