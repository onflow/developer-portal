import { useState } from "react"
import { ButtonLink } from "../Button"
import { EventCard, EventCardList, EventCardProps } from "../EventCard"
import { EventCardSmall } from "../EventCardSmall"
import TabMenu from "../TabMenu"

export type UpcomingEventsProps = {
  goToCommunityHref: string
  events: EventCardProps[]
}

export function UpcomingEvents({
  goToCommunityHref,
  events,
}: UpcomingEventsProps) {
  const [allEvents, setAllEvents] = useState(events)
  const [selectedEventIndex, setSelectedEventIndex] = useState(0)
  const primaryEvent = allEvents[selectedEventIndex]
  const remainingEvents = allEvents.filter(
    (event) => event.title !== primaryEvent.title
  )
  const filterMapping = ["Flow office hours"]

  const onTabChange = (filterIndex: number) => {
    if (filterIndex === 0) {
      setAllEvents(events)
      return
    }

    const filteredEvents = allEvents.filter(
      (event) => event.eventType === filterMapping[filterIndex - 1]
    )
    setAllEvents(filteredEvents)
  }

  return (
    <div className="container">
      <div className="text-h2 mb-2">Upcoming events</div>
      <TabMenu
        tabs={[
          { name: "Upcoming events", link: "#" },
          { name: "Flow office hours", link: "#" },
        ]}
        onTabChange={onTabChange}
      />
      <div className="py-6">
        <div className="hidden md:block">
          <EventCard {...primaryEvent} className="mb-4" />
          <ul className="hidden list-none flex-row gap-6 overflow-x-auto md:flex">
            {remainingEvents.map((event: EventCardProps, index: number) => (
              <li key={index} onClick={() => setSelectedEventIndex(index - 1)}>
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
            className="flex-1 md:max-w-[50%]"
            variant="secondary"
            href={goToCommunityHref}
            rightIcon="external"
          >
            Go to Community
          </ButtonLink>
          <div className="flex-1" />
        </div>
      </div>
    </div>
  )
}
