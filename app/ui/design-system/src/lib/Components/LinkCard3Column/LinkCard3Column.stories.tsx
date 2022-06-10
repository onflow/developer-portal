import { Meta, Story } from "@storybook/react"
import { LinkCard3Column, LinkCard3ColumnProps } from "."
import { ReactComponent as UseCaseIcon } from "../../../../images/content/use-cases"
import { ReactComponent as EcosystemIcon } from "../../../../images/content/ecosystem"
import { ReactComponent as SDKIcon } from "../../../../images/content/sdk"

export default {
  component: LinkCard3Column,
  title: "Components/LinkCard3Column",
} as Meta

const Template: Story<LinkCard3ColumnProps> = (args) => {
  return (
    <div style={{ backgroundColor: "#f1f1f1", padding: "14px" }}>
      <LinkCard3Column {...args} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  buttonText: "Get Started",
  buttonUrl: "#changeme",
  description:
    "Building on Flow is easy. Start building now with lorem ipsum et sigitus loranum prospitarius.",
  title: "Start Your Project",
  tags: ["Tag", "Lorem", "Ipsum"],
  items: [
    {
      title: "Quickstart",
      description:
        "A package used to interact with user wallets and the Flow blockchain.",
      icon: <UseCaseIcon />,
      links: [
        {
          title: "Quickstart tutorial",
          href: "#tutorial1",
          tags: ["tutorial"],
        },
        {
          title: "Name of a tutorial",
          href: "#tutorial2",
          tags: ["tutorial"],
        },
        {
          title: "Name of another tutorial",
          href: "#tutorial3",
          tags: ["tutorial"],
        },
      ],
    },
    {
      title: "Guides & Tutorials",
      description:
        "An up to 3-line blurb here describing the section lorem ipsum dolor sit amet proin.",
      icon: <EcosystemIcon />,
      links: [
        {
          title: "Guide 1",
          href: "#tutorial1",
          tags: ["tutorial"],
        },
        {
          title: "Guide 2",
          href: "#tutorial2",
        },
        {
          title: "An external link",
          href: "https://www.onflow.org",
          tags: ["tutorial", "external"],
        },
      ],
    },
    {
      title: "Smart Contracts",
      description: "Smart contracts description.",
      icon: <SDKIcon />,
      links: [
        {
          title: "Name of a Smart Contract tutorial",
          href: "#tutorial1",
          tags: ["tutorial"],
        },
        {
          title: "Name of a tutorial",
          href: "#tutorial2",
          tegs: ["tag1", "tag2", "tag3", "tag4"],
        },
        {
          title: "View all SDK's",
          href: "#sdks",
        },
      ],
    },
  ],
}

export const DefaultMobile = Template.bind({})
DefaultMobile.args = Default.args
DefaultMobile.parameters = {
  viewport: {
    defaultViewport: "xs",
  },
}

export const DefaultDark = Template.bind({})
DefaultDark.args = Default.args
DefaultDark.parameters = {
  themes: {
    default: "dark",
  },
}
