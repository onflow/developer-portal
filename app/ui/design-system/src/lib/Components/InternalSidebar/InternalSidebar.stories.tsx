import { Meta, Story } from "@storybook/react"
import { InternalSidebar, InternalSidebarProps, TEMP_SIDEBAR_CONFIG } from "."

export default {
  component: InternalSidebar,
  title: "Components/InternalSidebar",
  parameters: {
    layout: "padded",
  },
} as Meta

const Template: Story<InternalSidebarProps> = (args) => (
  <div style={{ width: "300px" }}>
    <InternalSidebar {...args} />
  </div>
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
