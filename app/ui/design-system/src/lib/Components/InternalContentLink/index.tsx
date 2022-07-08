import clsx from "clsx"
import AppLink, { isLinkExternal } from "../AppLink"
import ExternalLinkIcon from "./ExternalLinkIcon"

const defaultClasses =
  "leading-[1.1] relative not-prose text-primary-blue dark:text-blue-dark hover:opacity-75 dark:border-blue-dark dark:stroke-blue-dark"

export type LinkProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLAnchorElement> & {
    href: string
    "data-footnote-ref"?: boolean
  },
  HTMLAnchorElement
>

export function InternalContentLink({
  children,
  className,
  id,
  href,
  ...props
}: LinkProps) {
  const isFootnote = !!props["data-footnote-ref"]
  const isExternalLink = isLinkExternal(href)

  if (isExternalLink) {
    return (
      <AppLink
        to={href}
        className={clsx(defaultClasses, {
          "inline stroke-primary-blue": !isFootnote,
          "ml-0.5": isFootnote,
        })}
      >
        <span
          className={clsx({
            "pr-px": isExternalLink,
          })}
        >
          {children}
        </span>
        {isExternalLink && <ExternalLinkIcon className="inline" />}
      </AppLink>
    )
  }

  return (
    <AppLink to={href} className={clsx("mr-1", className)}>
      {isFootnote ? <>[{children}]</> : children}
    </AppLink>
  )
}
