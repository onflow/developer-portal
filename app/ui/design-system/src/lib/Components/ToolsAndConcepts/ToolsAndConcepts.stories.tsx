import { Meta, Story } from "@storybook/react"
import ToolsAndConcepts, { ToolsAndConceptsProps } from "."

export default {
  component: ToolsAndConcepts,
  title: "Components/ToolsAndConcepts",
} as Meta

const Template: Story<ToolsAndConceptsProps> = (args) => {
  return (
    <div className="p-6 bg-primary-gray-50 dark:bg-black">
      <ToolsAndConcepts {...args} />
    </div>
  )
}

const args = {
  tools: Array(6).fill({
    title: "Flow Port",
    authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
    authorName: "mini flow",
    tags: ["Tags"],
    link: "#",
    stars: 52,
    toolIcon: (
      <img
        src="https://avatars.githubusercontent.com/u/62387156?s=64&v=4"
        alt=""
      />
    ),
    description:
      "Lorem ipsum text here can go a two liner sentence or a one liner",
  }),
}
export const Default = Template.bind({})
Default.args = args

export const mobile = Template.bind({})
mobile.args = args
mobile.parameters = {
  viewport: {
    defaultViewport: "xs",
  },
}
