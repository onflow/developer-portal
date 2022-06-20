import { Meta, Story } from "@storybook/react"
import { SDKCards, SDKCardsProps } from "."

export default {
  component: SDKCards,
  title: "Components/SDKCards",
} as Meta

const Template: Story<SDKCardsProps> = (args) => {
  return (
    <div className="bg-gray-100 p-4 dark:bg-black">
      <SDKCards {...args} />
    </div>
  )
}

export const Primary = Template.bind({})
Primary.args = {
  cards: [
    {
      title: "Flow Port",
      authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
      authorName: "mini flow",
      tags: ["Tags"],
      link: "#",
      type: "sdk",
      stars: 52,
      iconSrc: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
      lastCommit: "22/3",
      lastRelease: "207",
    },
    {
      title: "Flow Port",
      authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
      authorName: "mini flow",
      tags: ["Tags"],
      link: "#",
      type: "sdk",
      stars: 52,
      iconSrc: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
      lastCommit: "22/3",
      lastRelease: "207",
    },
  ],
}
