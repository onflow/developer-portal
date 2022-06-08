import { Meta, Story } from '@storybook/react';
import CommunityPage, { CommunityPageProps } from '.';
import { Default as DefaultCommunityMembers } from '../../Components/CommunityMembers/CommunityMembers.stories';
import { Default as DefaultFeaturedArticles } from '../../Components/FeaturedArticleSlider/FeaturedArticleSlider.stories';
import { Default as DefaultFlips } from '../../Components/Flips/Flips.stories';
import { Default as DefaultProjects } from '../../Components/ProjectCards/ProjectCards.stories';
import { Default as DefaultUpcomingEvents } from '../../Components/UpcomingEvents/UpcomingEvents.stories';

export default {
  component: CommunityPage,
  title: 'Pages/CommunityPage',
} as Meta;
const Template: Story<CommunityPageProps> = (args) => (
  <CommunityPage {...args} />
);
export const Default = Template.bind({});
Default.args = {
  upcomingEvents: DefaultUpcomingEvents.args,
  flips: DefaultFlips.args.flips,
  communityMembers: DefaultCommunityMembers.args,
  projects: DefaultProjects.args.projects,
  articles: DefaultFeaturedArticles.args.articles,
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
