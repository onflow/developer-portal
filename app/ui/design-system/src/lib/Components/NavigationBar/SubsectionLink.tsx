import { ReactComponent as File } from "../../../../images/content/file"
import { SubSection } from "./types"

export type SubsectionLinkProps = SubSection

const DEFAULT_ICON = <File height="1em" />

export function SubsectionLink({
  href,
  icon = DEFAULT_ICON,
  title,
}: SubsectionLinkProps) {
  return (
    <a
      href={href}
      className="flex items-center truncate py-1 hover:text-primary-blue dark:hover:text-blue-hover-dark md:px-2"
    >
      <span className="mr-1 hidden rounded border p-px	text-primary-gray-200 drop-shadow-sm">
        {icon}
      </span>
      {title}
    </a>
  )
}
