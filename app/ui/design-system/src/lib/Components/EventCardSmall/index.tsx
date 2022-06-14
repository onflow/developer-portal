import { ReactComponent as ExternalLinkIcon } from "../../../../images/content/external-link"
import Tag from "../Tag"

export type EventCardSmallProps = {
  eventType: string
  href: string
  imageAlt?: string
  imageSrc: string
  tags?: string[]
  title: string
  when: string
}

export function EventCardSmall({
  eventType = "Online",
  href,
  imageAlt = "",
  imageSrc,
  tags,
  title,
  when,
}: EventCardSmallProps) {
  return (
    <a
      href={href}
      rel="noreferrer"
      className="mb-4 flex min-w-max max-w-sm items-start rounded-lg bg-white px-6 py-5 hover:shadow-2xl dark:bg-primary-gray-dark dark:hover:shadow-2xl-dark"
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
          {when}
        </span>
        <span className="text-sm text-primary-gray-200">{eventType}</span>
      </span>
      <span className="flex-0 dark:text-primary-gray-200">
        <ExternalLinkIcon />
      </span>
    </a>
  )
}
