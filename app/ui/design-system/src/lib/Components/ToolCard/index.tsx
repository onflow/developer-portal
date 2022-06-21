import { ReactComponent as StarIcon } from "../../../../images/action/star"
import CodeIconSrc from "../../../../images/content/code.svg"
import CodeIconLightSrc from "../../../../images/content/code-light.svg"
import Tag from "../Tag"

export type ToolCardProps = {
  authorIcon?: string
  authorName?: string
  description?: string
  iconSrc?: string
  iconDarkModeSrc?: string
  link: string
  stars?: number
  tags?: string[]
  title: string
}

export function ToolCard({
  authorIcon,
  authorName,
  description,
  iconSrc,
  iconDarkModeSrc,
  link,
  stars,
  tags,
  title,
}: ToolCardProps) {
  return (
    <a
      className="flex gap-4 rounded-lg bg-white py-6 px-8 hover:shadow-2xl dark:bg-primary-gray-dark dark:text-white dark:hover:shadow-2xl-dark"
      href={link}
    >
      <div>
        <img
          className="dark:hidden"
          src={iconSrc || CodeIconSrc}
          alt={title}
          width={64}
        />
        <img
          className="hidden dark:block"
          src={iconDarkModeSrc || iconSrc || CodeIconLightSrc}
          alt={title}
          width={64}
        />
      </div>
      <div className="grow">
        <h5 className="text-h5">{title}</h5>
        <div className="flex items-center">
          <div className="flex shrink-0 items-center gap-2 pr-3 md:pr-4">
            {authorIcon && (
              <div className="h-6 w-6">
                <img src={authorIcon} alt={authorName} className="w-full" />
              </div>
            )}
            {authorName && (
              <div className="dark:gray-400 md:leading-1 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                {authorName}
              </div>
            )}
          </div>
          {stars !== undefined && (
            <div className="flex shrink-0 items-center gap-1">
              <StarIcon className="text-amber-400" width={16} height={16} />
              <div className="text-sm text-gray-500 dark:text-gray-300">
                {stars}
              </div>
            </div>
          )}
        </div>
        <div className="shrink-0 py-1 pr-1 line-clamp-1">
          {tags?.map((tag, i) => (
            <Tag name={tag} key={i} />
          ))}
        </div>
        <div className="pt-2 text-gray-700 line-clamp-2 dark:text-gray-300">
          {description}
        </div>
      </div>
    </a>
  )
}
