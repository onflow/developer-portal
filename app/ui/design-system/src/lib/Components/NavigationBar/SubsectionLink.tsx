import { ReactComponent as File } from "../../../../images/content/file"
import AppLink from "../AppLink"
import { SubSection } from "./types"
import { isLinkExternal } from "../../utils/isLinkExternal"
import { ReactComponent as ExternalLinkIcon } from "../../../../images/content/external-link"

export type SubsectionLinkProps = SubSection

const DEFAULT_ICON = <File height="1em" />

export function SubsectionLink({
  href,
  icon = DEFAULT_ICON,
  title,
}: SubsectionLinkProps) {
  return (
    <AppLink
      to={href}
      className="flex items-center truncate py-1 hover:text-primary-blue dark:hover:text-blue-hover-dark md:px-2"
    >
      <span className="mr-1 hidden rounded border p-px text-primary-gray-200 drop-shadow-sm">
        {icon}
      </span>
      {title} {isLinkExternal(href) && <ExternalLinkIcon className="pl-1" />}
    </AppLink>
  )
}
