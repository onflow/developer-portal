import { Meta, Story } from '@storybook/react';
import ProjectCards, { ProjectCardsProps } from '.';
import PageBackground from '../../Pages/shared/PageBackground';
import { Default as DefaultProjectCard } from '../ProjectCard/ProjectCard.stories';

export default {
  component: ProjectCards,
  title: 'Components/ProjectCards',
} as Meta;

const Template: Story<ProjectCardsProps> = (args) => (
  <PageBackground className="py-4">
    <ProjectCards {...args} />
  </PageBackground>
);

const args = {
  projects: [
    DefaultProjectCard.args,
    DefaultProjectCard.args,
    DefaultProjectCard.args,
    DefaultProjectCard.args,
  ],
};

export const Default = Template.bind({});
Default.args = args;

export const dark = Template.bind({});
dark.args = Default.args;
dark.parameters = {
  themes: {
    default: 'dark',
  },
};

export const mobile = Template.bind({});
mobile.args = args;
mobile.parameters = {
  viewport: {
    defaultViewport: 'xs',
  },
};
