import { Meta, Story } from '@storybook/react';
import NetworkDetailPage from '.';

export default {
  component: NetworkDetailPage,
  title: 'Pages/NetworkDetailPage',
} as Meta;

const Template: Story = () => <NetworkDetailPage />;
export const Default = Template.bind({});

export const Mobile = Template.bind({});
Mobile.parameters = {
  viewport: {
    defaultViewport: 'xs',
  },
};

export const dark = Template.bind({});
dark.parameters = {
  themes: {
    default: 'dark',
  },
};
