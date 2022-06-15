import clsx from "clsx"
import ExternalLinkIcon from "../Link/ExternalLinkIcon"
import { isLinkExternal } from "../Link/isLinkExternal"

export type MenuItemBase = { title: string; className?: string }
export type NavigationBarMenuItemLinkProps = MenuItemBase & { href: string }

export function MenuItemLink({
  className,
  href,
  title,
}: NavigationBarMenuItemLinkProps) {
  const isExternal = isLinkExternal(href)

  return (
    <a
      className={clsx(
        className,
        "inline-flex items-center whitespace-nowrap stroke-black text-primary-blue hover:opacity-75 dark:border-blue-dark dark:stroke-white dark:text-blue-dark"
      )}
      href={href}
      rel={isExternal ? "noreferrer" : undefined}
      target={isExternal ? "blank" : undefined}
    >
      <span>{title}</span>
      {isExternal && (
        <span className="ml-1">
          <ExternalLinkIcon />
        </span>
      )}
    </a>
  )
}
