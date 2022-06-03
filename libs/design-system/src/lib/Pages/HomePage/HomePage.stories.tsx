import { Meta, Story } from '@storybook/react';
import HomePage, { HomePageProps } from '.';

export default {
  component: HomePage,
  title: 'Pages/HomePage',
} as Meta;

const Template: Story<HomePageProps> = (args) => <HomePage {...args} />;
const flips = Array(3).fill({
  numComments: 23,
  heading: 'Error Subscribing to Events in Default Docs',
  tags: ['moo', 'crab', 'rangoon'],
  participant: {
    profileImage:
      'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    name: 'Marky Mark',
  },
  date: '23/3/22',
  forumLink: '#test',
});
export const Default = Template.bind({});
Default.args = { flips };

export const mobile = Template.bind({});
mobile.args = { flips };
mobile.parameters = {
  viewport: {
    defaultViewport: 'xs',
  },
};
