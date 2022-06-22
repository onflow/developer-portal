import { ReactComponent as ExternalLinkIcon } from "../../../../images/content/external-link"
import { EventCardProps } from "../EventCard"
import Tag from "../Tag"

export function EventCardSmall({
  location = "Online",
  imageAlt = "",
  imageSrc,
  tags,
  title,
  eventDate,
}: EventCardProps) {
  return (
    <div
      role="button"
      className="mb-4 flex min-w-max max-w-sm items-start rounded-lg bg-white px-6 py-5 hover:cursor-pointer hover:shadow-2xl dark:bg-primary-gray-dark dark:hover:shadow-2xl-dark"
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="h-[84px] w-[84px] flex-initial basis-[84px] rounded-md object-cover"
      />
      <span className="mx-5 flex flex-1 flex-col">
        <h3 className="text-h5">{title}</h3>
        {tags && tags.length > 0 && (
          <span>
            {tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </span>
        )}
        <span className="mt-1 mb-2 text-primary-gray-300 dark:text-primary-gray-100">
          {eventDate}
        </span>
        <span className="text-sm text-primary-gray-200">{location}</span>
      </span>
    </div>
  )
}
