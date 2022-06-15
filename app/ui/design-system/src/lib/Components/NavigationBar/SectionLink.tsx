import { ReactComponent as ChevronRightIcon } from "../../../../images/arrows/chevron-right"
import { SubSection } from "./types"

export type SectionLinkProps = SubSection

export function SectionLink({ href, title }: SectionLinkProps) {
  return (
    <a
      className="flex items-center justify-between text-sm font-semibold text-primary-blue hover:opacity-75 dark:text-blue-dark"
      href={href}
    >
      <span className="flex-1 truncate">{title}</span>
      <ChevronRightIcon />
    </a>
  )
}
