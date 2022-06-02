import { Meta, Story } from '@storybook/react';
import HomePage from '.';

export default {
  component: HomePage,
  title: 'Pages/HomePage',
} as Meta;

const Template: Story = () => <HomePage />;
export const Default = Template.bind({});

export const Mobile = Template.bind({});
Mobile.parameters = {
  viewport: {
    defaultViewport: 'xs',
  },
};
