import { Meta, Story } from "@storybook/react"
import TabMenu, { TabMenuProps } from "."

export default {
  component: TabMenu,
  title: "Components/TabMenu",
} as Meta

const Template: Story<TabMenuProps> = (args) => <TabMenu {...args} />

export const Default = Template.bind({})
Default.args = {
  tabs: ["Mainnet", "Testnet", "Canary"],
  onTabChange: () => null,
}

export const centered = Template.bind({})
centered.args = {
  ...Default.args,
  centered: true,
}

export const dark = Template.bind({})
dark.args = Default.args
dark.parameters = {
  themes: {
    default: "dark",
  },
}

export const mobile = Template.bind({})
mobile.args = {
  tabs: ["Mainnet", "Testnet", "Canary", "Foo", "Bar"],
}
mobile.parameters = {
  viewport: {
    defaultViewport: "xs",
  },
}
