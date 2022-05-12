import { Meta, Story } from '@storybook/react';
import { TypeStyles } from './TypeStyles';

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
