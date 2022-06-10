import { Meta, Story } from "@storybook/react"
import { ContentNavigation, ContentNavigationProps } from "."

export default {
  component: ContentNavigation,
  title: "Components/ContentNavigation",
  argTypes: {
    icon: {
      options: [
        "community",
        "concepts",
        "get-started",
        "learn",
        "bug",
        "tools",
        "funding",
      ],
      control: { type: "select" },
    },
  },
} as Meta

const Template: Story<ContentNavigationProps> = (args) => (
  <div className="bg-gray-300 dark:bg-black">
    <ContentNavigation {...args} />
  </div>
)

export const Primary = Template.bind({})
Primary.args = {
  title: "Get Started",
  text: "Lorem ipsum dolor sit amet proin gravida lorem ipsum",
  link: "#",
  icon: "bug",
}
