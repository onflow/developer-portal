import { Meta, Story } from "@storybook/react"
import { LowerPageNav, LowerPageNavProps } from "."

export default {
  component: LowerPageNav,
  title: "Components/LowerPageNav",
  parameters: {
    layout: "padded",
  },
} as Meta

const Template: Story<LowerPageNavProps> = (args) => <LowerPageNav {...args} />

export const Default = Template.bind({})
Default.args = {
  next: {
    href: "#example",
    name: "Next Article Name",
  },
  prev: {
    href: "#example",
    name: "Prev Article Name",
  },
}

export const dark = Template.bind({})
dark.args = Default.args
dark.parameters = {
  backgrounds: {
    default: "dark",
  },
}

export const longName = Template.bind({})
longName.args = {
  next: {
    href: "#example",
    name: "Query Staking Info with Scripts or Events",
  },
  prev: {
    href: "#example",
    name: "Quorum Certificate and Distributed Key Generation",
  },
}

export const PreviousOnly = Template.bind({})
PreviousOnly.args = {
  prev: Default.args.prev,
}

export const NextOnly = Template.bind({})
NextOnly.args = {
  next: Default.args.next,
}
