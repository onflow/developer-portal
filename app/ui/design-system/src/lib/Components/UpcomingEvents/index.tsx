import { useState } from "react"
import { ButtonLink } from "../Button"
import { EventCardList, EventCardProps } from "../EventCard"
import { EventCardSmall, EventCardSmallProps } from "../EventCardSmall"
import TabMenu from "../TabMenu"

export type UpcomingEventsProps = {
  officeHours: React.ReactNode
  workingHours: React.ReactNode
  submitEventHref: string
  goToCommunityHref: string
  primaryEvents: EventCardProps[]
  secondaryEvents: EventCardSmallProps[]
}

export function UpcomingEvents({
  officeHours,
  workingHours,
  submitEventHref,
  goToCommunityHref,
  primaryEvents,
  secondaryEvents,
}: UpcomingEventsProps) {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div className="container">
      <div className="text-h2 mb-2">Upcoming events</div>
      <TabMenu
        tabs={["Upcoming events", "Working hours", "Flow office hours"]}
        onTabChange={setSelectedTab}
      />
      {selectedTab === 0 && (
        <div className="py-6">
          <EventCardList
            events={primaryEvents}
            breakpoint="none"
            className="mb-4"
            carouselItemWidth="w-10/12 md:w-full"
          />
          <ul className="hidden list-none flex-row gap-6 overflow-x-auto md:flex">
            {secondaryEvents.map((event, index) => (
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
      {selectedTab === 1 && <div>{workingHours}</div>}
      {selectedTab === 2 && <div>{officeHours}</div>}
    </div>
  )
}
