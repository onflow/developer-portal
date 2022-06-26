import { Meta, Story } from "@storybook/react"
import ProjectCards, { ProjectCardsProps } from "."
import { ProjectCardProps } from "../ProjectCard"
import { Default as DefaultProjectCard } from "../ProjectCard/ProjectCard.stories"

export default {
  component: ProjectCards,
  title: "Components/ProjectCards",
  parameters: {
    layout: "centered",
  },
} as Meta

const Template: Story<ProjectCardsProps> = (args) => <ProjectCards {...args} />

const projectCardArgs = DefaultProjectCard.args as ProjectCardProps
export const Default = Template.bind({})

Default.args = {
  headerLink: "#",
  projects: [
    projectCardArgs,
    projectCardArgs,
    projectCardArgs,
    projectCardArgs,
  ],
}

export const dark = Template.bind({})
dark.args = Default.args
dark.parameters = {
  backgrounds: {
    default: "dark",
  },
}

export const mobile = Template.bind({})
mobile.args = Default.args
mobile.parameters = {
  viewport: {
    defaultViewport: "xs",
  },
}
