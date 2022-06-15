import { ReactComponent as CalendarIcon } from "../../../../images/action/date-calendar"
import { ReactComponent as StarIcon } from "../../../../images/action/star"
import { ReactComponent as CommitIcon } from "../../../../images/content/commit"
import ElixirIconSrc from "../../../../images/sdk/elixir.svg"
import GoIconSrc from "../../../../images/sdk/go.svg"
import NetIconSrc from "../../../../images/sdk/net.svg"
import RustIconSrc from "../../../../images/sdk/rust.svg"
import SwiftIconSrc from "../../../../images/sdk/swift.svg"
import Tag from "../Tag"

export const SDK_ICONS = {
  elixir: ElixirIconSrc,
  go: GoIconSrc,
  net: NetIconSrc,
  rust: RustIconSrc,
  swift: SwiftIconSrc,
}

export type SdkIcon =
  | { iconSrc: string; iconType?: never }
  | { iconSrc?: never; iconType: keyof typeof SDK_ICONS }

export type SDKCardProps = {
  title: string
  authorIcon: string
  authorName: string
  tags: string[]
  link: string
  stars: number
  lastCommit: string
  lastRelease: string
} & SdkIcon

export function SDKCard({
  title,
  authorIcon,
  authorName,
  tags,
  link,
  stars,
  iconSrc,
  iconType,
  lastCommit,
  lastRelease,
}: SDKCardProps) {
  return (
    <a
      className="flex gap-4 rounded-lg bg-white py-6 px-8 hover:shadow-2xl dark:bg-primary-gray-dark dark:hover:shadow-2xl-dark"
      href={link}
    >
      <div>
        <img
          src={iconType ? SDK_ICONS[iconType] : iconSrc}
          alt={title}
          width={64}
        />
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
            <div className="scale-50">
              <StarIcon className="text-amber-400" />
            </div>
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
