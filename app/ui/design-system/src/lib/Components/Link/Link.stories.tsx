import { Meta, Story } from "@storybook/react"
import { Link, LinkProps } from "."

export default {
  component: Link,
  title: "Components/Link",
  parameters: {
    layout: "padded",
  },
} as Meta

const Template: Story<LinkProps> = (args) => <Link {...args} />

export const ExternalLink = Template.bind({})
ExternalLink.args = {
  href: "http://www.example.com",
  children: "External Link",
  isExternal: true,
}

export const InternalLink = Template.bind({})
InternalLink.args = {
  href: "/internal-link",
  children: "Internal Link",
}
