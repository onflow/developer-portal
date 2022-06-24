import { ReactNode } from "react"
import { ReactComponent as Anchor } from "../../../../images/content/anchor"

export interface HeaderWithLinkProps {
  children: ReactNode
  className: string
  headerLink: string
}

export function HeaderWithLink({
  children,
  headerLink,
  className,
}: HeaderWithLinkProps) {
  return (
    <div className={`${className} group flex items-center`}>
      <span className="inline">{children}</span>
      <a href={`#${headerLink}`}>
        <Anchor
          width={32}
          height={32}
          className="inline fill-white opacity-0 group-hover:opacity-100 dark:fill-black"
        />
      </a>
    </div>
  )
}
