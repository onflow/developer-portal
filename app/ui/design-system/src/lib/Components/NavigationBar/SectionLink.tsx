import { ReactComponent as ChevronRightIcon } from "../../../../images/arrows/chevron-right"
import AppLink from "../AppLink"
import { SubSection } from "./types"

export type SectionLinkProps = SubSection

export function SectionLink({ href, title }: SectionLinkProps) {
  return (
    <AppLink
      className="flex items-center justify-between px-2 font-semibold text-primary-blue hover:opacity-75 dark:text-blue-dark"
      to={href}
    >
      <span className="flex-1 truncate">{title}</span>
      <ChevronRightIcon />
    </AppLink>
  )
}
