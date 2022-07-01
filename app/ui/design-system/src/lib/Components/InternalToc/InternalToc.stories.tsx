import { Meta, Story } from "@storybook/react"
import { InternalToc, InternalTocProps } from "."

export default {
  component: InternalToc,
  title: "Components/InternalToc",
  parameters: {
    layout: "padded",
  },
} as Meta

const Template: Story<InternalTocProps> = (args) => <InternalToc {...args} />

export const Default = Template.bind({})

Default.args = {
  headings: [
    { hash: "introduction", title: "Introduction" },
    { hash: "links", title: "Links" },
    { hash: "unordered-list", title: "Unordered List" },
    { hash: "ordered-list", title: "Ordered List" },
    { hash: "task-list", title: "Task List" },
    { hash: "table", title: "Table" },
    { hash: "footnote", title: "Footnote" },
  ],
  location: new URL("localhost:4400/#introduction"),
}
