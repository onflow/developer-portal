import { Meta, Story } from '@storybook/react';
import { TypeStyles } from './';

export default {
  component: TypeStyles,
  title: 'Styles/TypeStyles',
  parameters: {
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: 'docs',
  },
} as Meta;

const Template: Story = () => <TypeStyles />;
export const Default = Template.bind({});
