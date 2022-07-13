import clsx from "clsx"
import AppLink, { isLinkExternal } from "../AppLink"
import ExternalLinkIcon from "../InternalContentLink/ExternalLinkIcon"

export type MenuItemBase = { title: string; className?: string }
export type NavigationBarMenuItemLinkProps = MenuItemBase & { href: string }

export function MenuItemLink({
  className,
  href,
  title,
}: NavigationBarMenuItemLinkProps) {
  const isExternal = isLinkExternal(href)

  return (
    <AppLink
      className={clsx(
        className,
        "inline-flex items-center whitespace-nowrap stroke-black text-primary-blue hover:opacity-75 dark:border-blue-dark dark:stroke-white dark:text-blue-dark"
      )}
      to={href}
    >
      <span>{title}</span>
      {isExternal && (
        <span className="ml-2">
          <ExternalLinkIcon />
        </span>
      )}
    </AppLink>
  )
}
