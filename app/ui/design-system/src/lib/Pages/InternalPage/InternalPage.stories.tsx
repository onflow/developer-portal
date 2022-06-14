import { Meta, Story } from "@storybook/react"
import { InternalPage } from "."

export default {
  component: InternalPage,
  title: "Pages/InternalPage",
} as Meta

const Template: Story = (args) => {
  return (
    <div style={{ padding: "1rem" }}>
      <InternalPage />
    </div>
  )
}

export const Primary = Template.bind({})
export const PrimaryDark = Template.bind({})
PrimaryDark.parameters = {
  backgrounds: {
    default: "dark",
  },
}

export const PrimaryMobile = Template.bind({})
PrimaryMobile.parameters = {
  viewport: {
    defaultViewport: "xs",
  },
}
