import { Meta, Story } from '@storybook/react';
import CommunityPage, { CommunityPageProps } from '.';
import { Default as DefaultCommunityMembers } from '../../Components/CommunityMembers/CommunityMembers.stories';
import { Default as DefaultFlips } from '../../Components/Flips/Flips.stories';

export default {
  component: CommunityPage,
  title: 'Pages/CommunityPage',
} as Meta;
const Template: Story<CommunityPageProps> = (args) => (
  <CommunityPage {...args} />
);
export const Default = Template.bind({});
Default.args = {
  flips: DefaultFlips.args.flips,
  communityMembers: DefaultCommunityMembers.args,
};

export const dark = Template.bind({});
dark.args = Default.args;
dark.parameters = {
  themes: {
    default: 'dark',
  },
};

export const mobile = Template.bind({});
mobile.args = Default.args;
mobile.parameters = {
  viewport: {
    defaultViewport: 'xs',
  },
};
