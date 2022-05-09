import { Meta, Story } from '@storybook/react';
import { InputProps, StaticCheckbox } from './StaticCheckbox';

export default {
  component: StaticCheckbox,
  title: 'StaticCheckbox',
} as Meta;

const Template: Story<InputProps> = (args) => <StaticCheckbox {...args} />;

export const StaticCheckboxChecked = Template.bind({});
StaticCheckboxChecked.args = {
  checked: true,
};

export const StaticCheckboxUnchecked = Template.bind({});
StaticCheckboxUnchecked.args = {};
