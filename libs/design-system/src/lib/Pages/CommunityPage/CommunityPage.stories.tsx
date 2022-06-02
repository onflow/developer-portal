import { Meta, Story } from '@storybook/react';
import CommunityPage, { CommunityPageProps } from '.';
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
  ...DefaultFlips.args,
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
