import { Meta, Story } from "@storybook/react"
import { AnnouncementBanner } from "."

export default {
  component: AnnouncementBanner,
  title: "Components/AnnouncementBanner",
} as Meta

const Template: Story = (args) => {
  return (
    <AnnouncementBanner {...args}>
      <div>
        Permissionless deployment is coming to Flow! Read more{" "}
        <span style={{ textDecoration: "underline" }}>
          <a
            href="https://permissionless.onflow.org/"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
        </span>
      </div>
    </AnnouncementBanner>
  )
}

export const Default = Template.bind({})

export const Mobile = Template.bind({})
Mobile.parameters = {
  viewport: {
    defaultViewport: "xs",
  },
}
