import { Meta, Story } from '@storybook/react';
import NetworkPage from '.';

export default {
  component: NetworkPage,
  title: 'Pages/NetworkPage',
} as Meta;

const Template: Story = () => <NetworkPage />;
export const Default = Template.bind({});

export const DefaultMobile = Template.bind({});
DefaultMobile.parameters = {
  viewport: {
    defaultViewport: 'xs',
  },
};
