import { Meta, Story } from '@storybook/react';
import { GettingStartedPage } from '.';

export default {
  component: GettingStartedPage,
  title: 'Pages/GettingStartedPage',
} as Meta;

const Template: Story = (args) => {
  return <GettingStartedPage />;
};

export const Default = Template.bind({});
export const dark = Template.bind({});
dark.parameters = {
  themes: {
    default: 'dark',
  },
};

export const mobile = Template.bind({});
mobile.parameters = {
  viewport: {
    defaultViewport: 'xs',
  },
};
