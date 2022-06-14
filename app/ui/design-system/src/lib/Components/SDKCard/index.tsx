import { ReactComponent as CalendarIcon } from "../../../../images/action/date-calendar"
import { ReactComponent as StarIcon } from "../../../../images/action/star"
import { ReactComponent as CommitIcon } from "../../../../images/content/commit"
import Tag from "../Tag"

export interface SDKCardProps {
  title: string
  authorIcon: string
  authorName: string
  tags: string[]
  link: string
  stars: number
  toolIconSrc: string
  lastCommit: string
  lastRelease: string
}

export function SDKCard({
  title,
  authorIcon,
  authorName,
  tags,
  link,
  stars,
  toolIconSrc,
  lastCommit,
  lastRelease,
}: SDKCardProps) {
  return (
    <a
      className="flex gap-4 rounded-lg bg-white py-6 px-8 hover:shadow-2xl dark:bg-primary-gray-dark dark:hover:shadow-2xl-dark"
      href={link}
    >
      <div>
        <img src={toolIconSrc} alt={title} width={64} />
      </div>
      <div className="grow">
        <h5 className="text-h5">{title}</h5>
        <div className="flex items-center">
          <div className="flex shrink-0 items-center gap-2 pr-3 md:pr-4">
            <div>
              <img src={authorIcon} alt={authorName} width={24} height={24} />
            </div>
            <div className="dark:gray-400 md:leading-1 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
              {authorName}
            </div>
          </div>

          <div className="shrink-0 pr-1 line-clamp-1">
            {tags.map((tag, i) => (
              <Tag name={tag} key={i} />
            ))}
          </div>

          <div className="flex shrink-0 gap-1">
            <StarIcon className="h-fit text-amber-400" width={14} height={14} />
            <div className="md:leading-1 h-fit text-sm text-gray-500 dark:text-gray-300">
              {stars}
            </div>
          </div>
        </div>
        <div className="align-center -mb-1 grid w-fit grid-cols-1 gap-x-4 justify-self-center pt-6 text-gray-500 md:grid-cols-2	">
          <div className="flex items-center">
            <CalendarIcon
              className="mr-3 stroke-gray-500"
              width={22}
              height={18}
            />
            <div>{lastRelease} days ago</div>
          </div>
          <div className="flex items-center">
            <CommitIcon className="mr-3 fill-gray-500" width={22} height={22} />
            <div>{lastCommit}</div>
          </div>
        </div>
      </div>
    </a>
  )
}
