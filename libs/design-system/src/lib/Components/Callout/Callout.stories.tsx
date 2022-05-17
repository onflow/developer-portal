import { Meta, Story } from '@storybook/react';
import { Callout, CalloutProps } from './';

export default {
  component: Callout,
  title: 'Components/Callout',
} as Meta;

const Template: Story<CalloutProps> = (args) => <Callout {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Alert Title',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  linkName: 'Example Link',
  linkHref: 'http://www.example.com',
};

export const dark = Template.bind({});
dark.args = {
  title: 'Alert Title',
  text: 'Lorem ipsum dolor sit amet, consectetur',
  linkHref: 'http://www.example.com',
};
dark.parameters = {
  themes: {
    default: 'dark',
  },
};

export const withoutLink = Template.bind({});
withoutLink.args = {
  title: 'Alert Title',
  text: 'Lorem ipsum dolor sit amet, consectetur',
};

export const WithoutLinkDark = Template.bind({});
WithoutLinkDark.args = {
  title: 'Alert Title',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
};
WithoutLinkDark.parameters = {
  themes: {
    default: 'dark',
  },
};
