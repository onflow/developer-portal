import { Meta, Story } from '@storybook/react';
import { LearnPage, LearnPageProps } from '.';
import { data } from './sample';

export default {
  component: LearnPage,
  title: 'Pages/LearnPage',
} as Meta;

const Template: Story<LearnPageProps> = (args) => (
  <LearnPage {...data} {...args} />
);

export const Default = Template.bind({});

export const Mobile = Template.bind({});
Mobile.parameters = {
  viewport: {
    defaultViewport: 'xs',
  },
};
