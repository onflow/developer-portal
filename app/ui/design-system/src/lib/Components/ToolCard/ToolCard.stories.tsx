import { Meta, Story } from "@storybook/react"

import { ReactComponent as CadenceIcon } from "../../../../images/tools/tool-cadence"
import { ToolCard, ToolCardProps } from "."

export default {
  component: ToolCard,
  title: "Components/ToolCard",
} as Meta

const Template: Story<ToolCardProps> = (args) => {
  return (
    <div className="bg-gray-100 p-4 dark:bg-black">
      <ToolCard {...args} />
    </div>
  )
}

export const Primary = Template.bind({})
Primary.args = {
  title: "Flow Port",
  authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  authorName: "mini flow",
  tags: ["Tags"],
  link: "#",
  type: "tool",
  stars: 52,
  toolIcon: <CadenceIcon />,
  description:
    "Lorem ipsum text here can go a two liner sentence or a one liner",
}
