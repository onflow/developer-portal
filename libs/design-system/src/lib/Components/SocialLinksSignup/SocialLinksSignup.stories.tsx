import React from "react"
import { Meta, Story } from '@storybook/react';
import SocialLinksSignup, { SocialLinksSignupProps } from '.';

export default {
  component: SocialLinksSignup,
  title: 'Components/SocialLinksSignup',
} as Meta;

const Template: Story<SocialLinksSignupProps> = (args) => {
  return <SocialLinksSignup {...args} />;
};

export const Default = Template.bind({});

export const Mobile = Template.bind({});
Mobile.parameters = {
  viewport: {
    defaultViewport: 'xs',
  },
};
