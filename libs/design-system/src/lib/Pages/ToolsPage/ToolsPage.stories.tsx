import { Meta, Story } from '@storybook/react';
import ToolsPage from '.';

export default {
  component: ToolsPage,
  title: 'Pages/ToolsPage',
} as Meta;

const Template: Story = () => <ToolsPage />;
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
