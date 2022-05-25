import { Meta, Story } from '@storybook/react';
import { InternalLandingCard, InternalLandingCardProps } from '.';

export default {
  component: InternalLandingCard,
  title: 'Components/InternalLandingCard',
} as Meta;

const Template: Story<InternalLandingCardProps> = (args) => {
  return <InternalLandingCard {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  title: 'Quick start',
  description: 'Values only need to be set once. We recommend doing this once',
  isPrimary: true,
};

export const PrimaryMobile = Template.bind({});
PrimaryMobile.args = Primary.args;
PrimaryMobile.parameters = {
  viewport: {
    defaultViewport: 'xs',
  },
};

export const primaryDark = Template.bind({});
primaryDark.args = Primary.args;
primaryDark.parameters = {
  themes: {
    default: 'dark',
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  isPrimary: false,
};

export const secondaryDark = Template.bind({});
secondaryDark.args = Secondary.args;
secondaryDark.parameters = {
  themes: {
    default: 'dark',
  },
};
