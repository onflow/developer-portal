import { Meta, Story } from '@storybook/react';
import { ButtonProps, Button } from '.';

export default {
  component: Button,
  title: 'Components/Button',
  args: {
    variant: 'primary',
  },
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
    },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => {
  return <Button className="py-2 px-8" {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
};

export const dark = Template.bind({});
dark.args = Default.args;
dark.parameters = {
  themes: {
    default: 'dark',
  },
};
