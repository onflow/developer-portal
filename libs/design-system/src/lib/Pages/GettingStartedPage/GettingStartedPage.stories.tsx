import { Meta, Story } from '@storybook/react';
import { GettingStartedPage } from '.';

export default {
  component: GettingStartedPage,
  title: 'Pages/GettingStartedPage',
} as Meta;

const Template: Story = (args) => {
  return <GettingStartedPage />;
};

export const Primary = Template.bind({});
export const PrimaryDark = Template.bind({});
PrimaryDark.parameters = {
  themes: {
    default: 'dark',
  },
};

export const PrimaryMobile = Template.bind({});
PrimaryMobile.parameters = {
  viewport: {
    defaultViewport: 'xs',
  },
};
