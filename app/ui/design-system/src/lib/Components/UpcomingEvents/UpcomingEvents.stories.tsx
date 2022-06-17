import { Meta, Story } from "@storybook/react"
import { UpcomingEvents, UpcomingEventsProps } from "."

export default {
  component: UpcomingEvents,
  title: "Components/UpcomingEvents",
} as Meta

const Template: Story<UpcomingEventsProps> = (args) => (
  <div className="bg-primary-gray-50 dark:bg-black" style={{ padding: "14px" }}>
    <UpcomingEvents {...args} />
  </div>
)

const DefaultArgs = {
  goToCommunityHref: "#todo",
  submitEventHref: "#todo",
  events: [
    {
      ctaText: "CTA Here",
      description:
        "Everything you need to start building on Flow verything you need to start building on Flow everything you need to start building on Flow",
      eventDate: "Mar 23",
      href: "#todo",
      imageSrc:
        "https://assets.website-files.com/5f6294c0c7a8cdf432b1c827/61689102d3325e237fd44b76_unnamed%20(8).png",
      location: "Online",
      tags: ["Flow official"],
      title: "Event Title",
    },
    {
      href: "https://www.onflow.org",
      description:
        "Everything you need to start building on Flow verything you need to start building on Flow everything you need to start building on Flow",
      eventType: "Online",
      imageSrc:
        "https://assets.website-files.com/5f6294c0c7a8cdf432b1c827/61410bc0c8d0522eea319058_Hack-blog_Flow.png",
      tags: ["Flow official"],
      title: "FLIP contest",
      eventDate: "May 5th, 5pm",
    },
    {
      href: "https://www.onflow.org",
      description:
        "Everything you need to start building on Flow verything you need to start building on Flow everything you need to start building on Flow",
      eventType: "Online",
      imageSrc:
        "https://assets.website-files.com/5f6294c0c7a8cdf432b1c827/61410bc0c8d0522eea319058_Hack-blog_Flow.png",
      tags: ["Flow official"],
      title: "FLIP contest",
      eventDate: "May 5th, 5pm",
    },
    {
      href: "https://www.onflow.org",
      description:
        "Everything you need to start building on Flow verything you need to start building on Flow everything you need to start building on Flow",
      eventType: "Online",
      imageSrc:
        "https://assets.website-files.com/5f6294c0c7a8cdf432b1c827/61410bc0c8d0522eea319058_Hack-blog_Flow.png",
      tags: ["Flow official"],
      title: "FLIP contest",
      eventDate: "May 5th, 5pm",
    },
    {
      href: "https://www.onflow.org",
      description:
        "Everything you need to start building on Flow verything you need to start building on Flow everything you need to start building on Flow",
      eventType: "Online",
      imageSrc:
        "https://assets.website-files.com/5f6294c0c7a8cdf432b1c827/61410bc0c8d0522eea319058_Hack-blog_Flow.png",
      tags: ["Flow official"],
      title: "FLIP contest",
      eventDate: "May 5th, 5pm",
    },
    {
      href: "https://www.onflow.org",
      description:
        "Everything you need to start building on Flow verything you need to start building on Flow everything you need to start building on Flow",
      eventType: "Online",
      imageSrc:
        "https://assets.website-files.com/5f6294c0c7a8cdf432b1c827/61410bc0c8d0522eea319058_Hack-blog_Flow.png",
      tags: ["Flow official"],
      title: "FLIP contest",
      eventDate: "May 5th, 5pm",
    },
  ],
}

export const Default = Template.bind({})
Default.args = DefaultArgs

export const SingleEvent = Template.bind({})
SingleEvent.args = {
  ...Default.args,
  events: DefaultArgs.events.slice(0, 1),
}
