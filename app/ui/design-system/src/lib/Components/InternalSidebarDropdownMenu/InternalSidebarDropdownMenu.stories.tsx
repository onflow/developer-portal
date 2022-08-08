import { Meta, Story } from "@storybook/react"
import {
  InternalSidebarDropdownMenu,
  InternalSidebarDropdownMenuProps,
} from "."

export default {
  component: InternalSidebarDropdownMenu,
  title: "Components/InternalSidebarDropdownMenu",
  parameters: {
    layout: "padded",
  },
} as Meta

const Template: Story<InternalSidebarDropdownMenuProps> = (args) => {
  return <InternalSidebarDropdownMenu {...args} />
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
