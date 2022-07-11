import { Meta, Story } from "@storybook/react"
import { LandingPageLinks, LandingPageLinksProps } from "."

export default {
  component: LandingPageLinks,
  title: "Components/LandingPageLinks",
} as Meta

const Template: Story<LandingPageLinksProps> = (args) => {
  return <LandingPageLinks {...args} />
}

export const Default = Template.bind({})
Default.args = {
  editPageUrl: "https://github.com/onflow/next-docs-v1",
}

export const WithoutEditPageUrl = Template.bind({})
WithoutEditPageUrl.args = {
  editPageUrl: undefined,
}
