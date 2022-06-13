import { Meta, Story } from "@storybook/react"
import { Button, ButtonProps } from "."

export default {
  component: Button,
  title: "Components/Button",
  args: {
    variant: "primary",
  },
  argTypes: {
    variant: {
      options: ["primary", "secondary"],
      control: { type: "select" },
    },
  },
} as Meta

const Template: Story<ButtonProps> = (args) => {
  return (
    <div
      style={{
        gap: "1rem",
        padding: "1rem",
        display: "inline-flex",
        flexDirection: "column",
      }}
    >
      <Button variant="primary">Primary</Button>
      <Button variant="primary-inverse">Primary Inverse</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondary" leftIcon="left">
        Secondary Prev
      </Button>
      <Button variant="secondary" rightIcon="right">
        Secondary Next
      </Button>
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  children: "Button",
}
export const defaultDark = Template.bind({})
defaultDark.args = Default.args
defaultDark.parameters = {
  backgrounds: {
    default: "dark",
  },
}
