import clsx from "clsx"
import { SectionLink } from "./SectionLink"
import { Link } from "./types"

export type SectionLinkListProps = {
  className?: string
  links: Link[]
}

export function SectionLinkList({ className, links }: SectionLinkListProps) {
  return (
    <div className={clsx("mt-2 pt-6 pb-3 md:gap-1", className)}>
      {links.map((link, index) => (
        <SectionLink key={index} title={link.title} href={link.href} />
      ))}
    </div>
  )
}
