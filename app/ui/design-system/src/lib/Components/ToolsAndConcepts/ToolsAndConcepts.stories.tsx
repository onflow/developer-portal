import { Meta, Story } from "@storybook/react"
import ToolsAndConcepts, { ToolsAndConceptsProps } from "."
import PageBackground from "../../Pages/shared/PageBackground"

export default {
  component: ToolsAndConcepts,
  title: "Components/ToolsAndConcepts",
} as Meta

const Template: Story<ToolsAndConceptsProps> = (args) => {
  return (
    <PageBackground className="bg-primary-gray-50 py-6 dark:bg-black">
      <ToolsAndConcepts {...args} />
    </PageBackground>
  )
}

const tools = Array(6).fill({
  title: "Flow Port",
  authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  authorName: "mini flow",
  tags: ["Tags"],
  link: "#",
  stars: 52,
  iconSrc: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  description:
    "Lorem ipsum text here can go a two liner sentence or a one liner",
})

const DefaultArgs: ToolsAndConceptsProps = {
  tools,
  concepts: tools,
}
export const Default = Template.bind({})
Default.args = DefaultArgs

export const ToolsOnly = Template.bind({})
ToolsOnly.args = {
  ...Default.args,
  concepts: undefined,
}

export const dark = Template.bind({})
dark.args = DefaultArgs
dark.parameters = {
  backgrounds: {
    default: "dark",
  },
}

export const mobile = Template.bind({})
mobile.args = DefaultArgs
mobile.parameters = {
  viewport: {
    defaultViewport: "xs",
  },
}
