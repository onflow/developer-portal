import { Meta, Story } from "@storybook/react"
import { InternalSidebar, InternalSidebarProps, SidebarItem } from "."

export default {
  component: InternalSidebar,
  title: "Components/InternalSidebar",
  parameters: {
    layout: "padded",
  },
} as Meta

const TEST_SIDEBAR_CONFIG: SidebarItem[] = [
  {
    title: "Api Documentation",
    items: [
      {
        title: "Quick Reference",
        href: "/cadence/language",
      },
      {
        title: "Configuration",
        href: "/configuration",
      },
      {
        title: "Authentication",
        href: "/authentication",
      },
      {
        title: "Proving Account Ownership",
        href: "/proving-account-ownership",
      },
    ],
  },
  {
    title: "Guides and Tutorials",
    items: [
      {
        title: "Introducing @onflow/fcl",
        href: "/introducing-onflow-fcl",
      },
    ],
  },
]

const Template: Story<InternalSidebarProps> = (args) => (
  <div style={{ width: "300px" }}>
    <InternalSidebar {...args} />
  </div>
)

export const Default = Template.bind({})

Default.args = {
  config: TEST_SIDEBAR_CONFIG,
}

export const dark = Template.bind({})
dark.args = Default.args
dark.parameters = {
  backgrounds: {
    default: "dark",
  },
}
