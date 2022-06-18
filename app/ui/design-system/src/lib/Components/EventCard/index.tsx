import clsx from "clsx"
import { ButtonLink } from "../Button"
import { Carousel, CarouselProps } from "../Carousel"
import Tag from "../Tag"

export type EventCardProps = {
  className?: string
  ctaText: string
  description: string
  eventDate: string
  href: string
  imageAlt?: string
  imageSrc: string
  location?: string
  tags?: string[]
  title: string
}

export function EventCard({
  className,
  ctaText,
  description,
  eventDate,
  href,
  imageAlt = "",
  imageSrc,
  location = "Online",
  tags,
  title,
}: EventCardProps) {
  return (
    <div
      className={clsx(
        "flex min-h-fit flex-col-reverse overflow-hidden rounded-2xl bg-white dark:bg-primary-gray-dark md:min-h-[30rem] md:flex-row",
        className
      )}
    >
      <div className="min-w-[50%] flex-none basis-1/2 self-center py-10 pl-6 pr-6 md:pr-32 md:pl-20">
        <div className="mb-1 divide-x divide-solid divide-primary-gray-200 text-sm font-semibold text-primary-gray-300 md:text-xl">
          <span className="pr-2">{eventDate}</span>
          <span className="pl-2">{location}</span>
        </div>
        <h3 className="text-h3 mb-2 !text-xl md:mb-3 md:!text-2xl">
          <a href={href}>{title}</a>
        </h3>
        {tags && tags.length > 0 && (
          <div>
            {tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
        )}
        <p className="mt-3 pb-6 dark:text-primary-gray-100">{description}</p>
        <ButtonLink
          href={href}
          variant="primary-no-darkmode"
          className="whitespace-nowrap px-16 py-4 text-center"
        >
          {ctaText}
        </ButtonLink>
      </div>
      <div className="flex-none basis-1/2 self-stretch">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

export type EventCardListProps = CarouselProps & {
  events: EventCardProps[]
}

export function EventCardList({
  events,
  ...carouselProps
}: EventCardListProps) {
  return (
    <Carousel {...carouselProps}>
      {events.map((event) => (
        <EventCard key={`${event.title}-${event.href}`} {...event} />
      ))}
    </Carousel>
  )
}
