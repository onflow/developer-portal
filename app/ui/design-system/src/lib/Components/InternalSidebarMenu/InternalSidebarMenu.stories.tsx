import { Meta, Story } from "@storybook/react"
import { InternalSidebarMenu, InternalSidebarMenuProps } from "."

export default {
  component: InternalSidebarMenu,
  title: "Components/InternalSidebarMenu",
} as Meta

const Template: Story<InternalSidebarMenuProps> = (args) => {
  return (
    <div style={{ padding: "1rem" }}>
      <InternalSidebarMenu {...args} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  selectedTool: "fcl",
}

export const dark = Template.bind({})
dark.args = Default.args
dark.parameters = {
  backgrounds: {
    default: "dark",
  },
}

export const mobile = Template.bind({})
mobile.args = {
  selectedTool: "port",
}
mobile.parameters = {
  viewport: {
    defaultViewport: "xs",
  },
}
