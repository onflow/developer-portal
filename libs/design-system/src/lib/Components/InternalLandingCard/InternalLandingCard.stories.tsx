import React from "react"
import { Meta, Story } from '@storybook/react';
import { InternalLandingCard, InternalLandingCardProps } from '.';

export default {
  component: InternalLandingCard,
  title: 'Components/InternalLandingCard',
} as Meta;

const Template: Story<InternalLandingCardProps> = (args) => {
  return <InternalLandingCard {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: 'Quick start',
  description: 'Values only need to be set once. We recommend doing this once',
  isDefault: true,
};

export const DefaultMobile = Template.bind({});
DefaultMobile.args = Default.args;
DefaultMobile.parameters = {
  viewport: {
    defaultViewport: 'xs',
  },
};

export const primaryDark = Template.bind({});
primaryDark.args = Default.args;
primaryDark.parameters = {
  themes: {
    default: 'dark',
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Default.args,
  isDefault: false,
};

export const secondaryDark = Template.bind({});
secondaryDark.args = Secondary.args;
secondaryDark.parameters = {
  themes: {
    default: 'dark',
  },
};
