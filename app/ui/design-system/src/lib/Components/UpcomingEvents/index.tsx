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
    { events: officeHours },
    { events: workingHours },
  ]
  const events = allEvents[selectedTab].events
  const primaryEvent =
    events.filter((event: EventCardProps) => event.isPrimary)[0] || events[0]
  const remainingEvents = events.slice(1)

  return (
    <div className="container">
      <div className="mb-2 text-h2">Upcoming events</div>
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
          <ul className="flex-row justify-between hidden gap-6 overflow-x-auto list-none md:flex">
            {remainingEvents.map((event: EventCardProps, index: number) => (
              <li key={index} className="mr-12">
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
        <div className="flex flex-col gap-6 mt-10 justify-items-stretch md:flex-row">
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
