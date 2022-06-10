import { Meta, Story } from "@storybook/react"
import { InternalToc, InternalTocProps } from "."

export default {
  component: InternalToc,
  title: "Components/InternalToc",
} as Meta

const Template: Story<InternalTocProps> = (args) => <InternalToc {...args} />

export const Default = Template.bind({})

Default.args = {
  headings: [
    { id: "introduction", value: "Introduction" },
    { id: "links", value: "Links" },
    { id: "unordered-list", value: "Unordered List" },
    { id: "ordered-list", value: "Ordered List" },
    { id: "task-list", value: "Task List" },
    { id: "table", value: "Table" },
    { id: "footnote", value: "Footnote" },
  ],
  location: new URL("localhost:4400/#introduction"),
}
