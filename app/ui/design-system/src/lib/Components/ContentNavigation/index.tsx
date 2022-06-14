import { ReactComponent as ChevronRight } from "../../../../images/arrows/chevron-right"
import {
  ContentNavigationIcon,
  ContentNavigationIconProps,
} from "./ContentNavigationIcon"

export type ContentNavigationProps = {
  title: string
  text: string
  link: string
} & ContentNavigationIconProps

export function ContentNavigation({
  title,
  text,
  link,
  icon,
}: ContentNavigationProps) {
  return (
    <a
      className="flex cursor-pointer items-center gap-8 rounded-lg bg-primary-gray-100/40 p-6 text-gray-700 hover:bg-primary-gray-100/75 md:p-10"
      href={link}
    >
      <div className="grow">
        <div className="mb-3 text-primary-gray-400 dark:text-primary-gray-100">
          <ContentNavigationIcon icon={icon} />
        </div>
        <div className="mb-2 font-display text-lg font-bold dark:text-white lg:text-2xl">
          {title}
        </div>
        <div className="dark:text-primary-gray-100">{text}</div>
      </div>
      <div className="text-black dark:text-primary-gray-100">
        <ChevronRight />
      </div>
    </a>
  )
}
