import { Meta, Story } from '@storybook/react';
import HomePage, { HomePageProps } from '.';
import { ReactComponent as UseCaseIcon } from '../../../../images/content/use-cases.svg';
import { ReactComponent as EcosystemIcon } from '../../../../images/content/ecosystem.svg';
import { ReactComponent as SDKIcon } from '../../../../images/content/sdk.svg';

export default {
  component: HomePage,
  title: 'Pages/HomePage',
} as Meta;

const Template: Story<HomePageProps> = (args) => <HomePage {...args} />;
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

const args = { flips, tools, threeColumnItems };
export const Default = Template.bind({});
Default.args = args;

export const mobile = Template.bind({});
mobile.args = args;
mobile.parameters = {
  viewport: {
    defaultViewport: 'xs',
  },
};
