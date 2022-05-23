import { Meta, Story } from '@storybook/react';
import SocialLinksSignup, { SocialLinksSignupProps } from '.';
import { endOfDay } from 'date-fns';

export default {
  component: SocialLinksSignup,
  title: 'Components/SocialLinksSignup',
} as Meta;

const Template: Story<SocialLinksSignupProps> = (args) => {
  return <SocialLinksSignup {...args} />;
};

export const Primary = Template.bind({});
