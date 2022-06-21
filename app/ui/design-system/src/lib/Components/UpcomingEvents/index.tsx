import { useState } from "react"
import { ButtonLink } from "../Button"
import { EventCard, EventCardList, EventCardProps } from "../EventCard"
import { EventCardSmall } from "../EventCardSmall"
import TabMenu from "../TabMenu"

export type UpcomingEventsProps = {
  submitEventHref: string
  goToCommunityHref: string
  upcoming: EventCardProps[]
  officeHours: EventCardProps[]
  workingHours: EventCardProps[]
}

export function UpcomingEvents({
  submitEventHref,
  goToCommunityHref,
  upcoming,
  officeHours,
  workingHours,
}: UpcomingEventsProps) {
  const [selectedTab, setSelectedTab] = useState(0)
  const allEvents = [
    { events: upcoming },
    { events: workingHours },
    { events: officeHours },
  ]
  const events = allEvents[selectedTab].events
  const primaryEvent =
    events.filter((event: EventCardProps) => event.isPrimary)[0] || events[0]
  const remainingEvents = events.filter((event) => !event.isPrimary)

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
      <div className="py-6">
        <div className="hidden md:block">
          <EventCard {...primaryEvent} className="mb-4" />
          <ul className="hidden list-none flex-row gap-6 overflow-x-auto md:flex">
            {remainingEvents.map((event: EventCardProps, index: number) => (
              <li key={index}>
                <EventCardSmall {...event} />
              </li>
            ))}
          </ul>
        </div>
        <EventCardList
          events={events}
          breakpoint="none"
          className="visible mb-4 md:hidden"
          carouselItemWidth="w-10/12 md:w-full"
        />
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
    </div>
  )
}
