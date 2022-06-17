import { useState } from "react"
import { ButtonLink } from "../Button"
import { EventCard, EventCardProps } from "../EventCard"
import { EventCardSmall } from "../EventCardSmall"
import TabMenu from "../TabMenu"

export type UpcomingEventsProps = {
  submitEventHref: string
  goToCommunityHref: string
  events: EventCardProps[]
}

export function UpcomingEvents({
  submitEventHref,
  goToCommunityHref,
  events,
}: UpcomingEventsProps) {
  const firstEvent = events[0]
  const remainingEvents = [...events].splice(0, 1)
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div className="container">
      <div className="text-h2 mb-2">Upcoming events</div>
      <TabMenu
        tabs={[
          { name: "Upcoming events", link: "#" },
          { name: "Working hours", link: "#" },
          { name: "Flow office hours", link: "#" },
        ]}
        onTabChange={setSelectedTab}
      />
      {selectedTab === 0 && (
        <div className="py-6">
          <EventCard {...firstEvent} className="mb-4" />
          <ul className="hidden list-none flex-row gap-6 overflow-x-auto md:flex">
            {remainingEvents.map((event: EventCardProps, index: number) => (
              <li key={index}>
                <EventCardSmall {...event} />
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col justify-items-stretch gap-6 md:flex-row">
            <ButtonLink
              className="flex-1"
              href={submitEventHref}
              rightIcon="right"
            >
              Submit an Event
            </ButtonLink>
            <ButtonLink
              className="flex-1"
              variant="secondary"
              href={goToCommunityHref}
              rightIcon="external"
            >
              Go to Community
            </ButtonLink>
          </div>
        </div>
      )}
    </div>
  )
}
