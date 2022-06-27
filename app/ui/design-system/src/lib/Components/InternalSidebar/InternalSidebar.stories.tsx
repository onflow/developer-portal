import { Meta, Story } from "@storybook/react"
import { InternalSidebar, InternalSidebarProps, TEMP_SIDEBAR_CONFIG } from "."

export default {
  component: InternalSidebar,
  title: "Components/InternalSidebar",
} as Meta

const Template: Story<InternalSidebarProps> = (args) => (
  <InternalSidebar {...args} />
)

export const Default = Template.bind({})

Default.args = {
  config: TEMP_SIDEBAR_CONFIG,
}

export const dark = Template.bind({})
dark.args = Default.args
dark.parameters = {
  backgrounds: {
    default: "dark",
  },
}
