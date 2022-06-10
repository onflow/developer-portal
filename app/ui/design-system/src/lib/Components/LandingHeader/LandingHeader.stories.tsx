import { Meta, Story } from '@storybook/react';
import { LandingHeader, LandingHeaderProps } from '.';

export default {
  component: LandingHeader,
  title: 'Components/LandingHeader',
  argTypes: {
    gradient: {
      options: [
        'community',
        'concepts',
        'getting-started',
        'home',
        'network',
        'tools',
      ],
      control: { type: 'select' },
    },
  },
} as Meta;

const Template: Story<LandingHeaderProps> = (args) => {
  return <LandingHeader {...args} />;
};

export const Community = Template.bind({});
Community.args = {
  buttonText: 'Button Text',
  buttonUrl: '#changeme',
  callout: 'Featured callout here two lines',
  description:
    'Lorem ipsum dolor sit amet proin gravida lorem ipsum dolor sit.',
  gradient: 'community',
  title: 'Community',
};

export const GettingStarted = Template.bind({});
GettingStarted.args = {
  ...Community.args,
  title: 'Getting Started',
  gradient: 'getting-started',
  description:
    'Everything you need to start building on Flow verything you need to start building on Flow ever.',
};

export const Learn = Template.bind({});
Learn.args = {
  ...Community.args,
  title: 'Learn',
};

export const Concepts = Template.bind({});
Concepts.args = {
  ...Community.args,
  title: 'Concepts',
  gradient: 'concepts',
};

export const Tools = Template.bind({});
Tools.args = {
  ...Community.args,
  title: 'Tools',
  gradient: 'tools',
};
