import { Meta, Story } from '@storybook/react';
import CommunityMembers, { CommunityMembersProps } from '.';

export default {
  component: CommunityMembers,
  title: 'Components/CommunityMembers',
} as Meta;

const Template: Story<CommunityMembersProps> = (args) => {
  return (
    <div style={{ backgroundColor: '#f1f1f1', padding: '14px' }}>
      <CommunityMembers {...args} />
    </div>
  );
};

const args = {
  authors: Array(3).fill({
    name: 'Luke Skywalker',
    title: 'Jedi Master',
    profileImage:
      'https://www.slashfilm.com/img/gallery/heres-what-the-new-luke-skywalker-looks-like-under-his-digital-mask/l-intro-1644193087.jpg',
  }),
  contributors: Array(27).fill({
    name: 'Luke Skywalker',
    profileImage:
      'https://www.slashfilm.com/img/gallery/heres-what-the-new-luke-skywalker-looks-like-under-his-digital-mask/l-intro-1644193087.jpg',
  }),
};

export const Primary = Template.bind({});
Primary.args = args;

export const Mobile = Template.bind({});
Mobile.args = args;
Mobile.parameters = {
  viewport: {
    defaultViewport: 'xs',
  },
};
