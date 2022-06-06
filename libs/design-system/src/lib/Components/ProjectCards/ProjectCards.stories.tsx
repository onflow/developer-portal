import { Meta, Story } from '@storybook/react';
import ProjectCards, { ProjectCardsProps } from '.';
import GrayPage from '../../Pages/shared/GrayPage';
import { Default as DefaultProjectCard } from '../ProjectCard/ProjectCard.stories';

export default {
  component: ProjectCards,
  title: 'Components/ProjectCards',
} as Meta;

const Template: Story<ProjectCardsProps> = (args) => (
  <GrayPage className="py-4">
    <ProjectCards {...args} />
  </GrayPage>
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
