import { Meta, Story } from '@storybook/react';
import { Attribution, AttributionProps } from './Attribution';

export default {
  component: Attribution,
  title: 'Attribution',
} as Meta;

const Template: Story<AttributionProps> = (args) => <Attribution {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  updatedDate: '23/3/2022',
  authorIcon: 'https://avatars.githubusercontent.com/u/62387156?s=64&v=4',
  authorName: '@maxxP',
  otherAuthorsCount: 12,
  readMinutes: 4,
  difficulty: 'Beginners',
};
