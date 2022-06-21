import { Meta, Story } from "@storybook/react"
import { SDKCard, SDKCardProps } from "."

export default {
  component: SDKCard,
  title: "Components/SDKCard",
} as Meta

const Template: Story<SDKCardProps> = (args) => {
  return (
    <div className="bg-gray-100 p-4 dark:bg-black">
      <SDKCard {...args} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  title: "Flow Port",
  authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  authorName: "mini flow",
  tags: ["Tags"],
  link: "#",
  type: "sdk",
  stars: 52,
  lastCommit: "22/3",
  lastRelease: "207",
}

export const Minimal = Template.bind({})
Minimal.args = {
  link: "#",
  title: "Flow Port",
}
