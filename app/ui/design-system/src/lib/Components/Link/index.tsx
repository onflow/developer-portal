import clsx from "clsx"
import ExternalLinkIcon from "./ExternalLinkIcon"

const defaultClasses =
  "leading-[1.1] relative text-primary-blue inline-flex items-center dark:text-blue-dark hover:opacity-75 dark:border-blue-dark dark:stroke-blue-dark"

export type LinkProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLAnchorElement> & {
    href?: string
    "data-footnote-ref"?: boolean
    isExternal?: boolean
  },
  HTMLAnchorElement
>

//@ts-ignore: We need to figure out how to type this
export function Link({
  children,
  className,
  id,
  href,
  isExternal,
  ...props
}: any) {
  const isFootnote = !!props["data-footnote-ref"]

  const classes = clsx(defaultClasses, {
    "stroke-primary-blue inline-flex": !isFootnote,
    "ml-0.5": isFootnote,
  })

  if (isExternal) {
    return (
      <a target="blank" rel="noreferrer" href={href || ""} className={classes}>
        <span
          className={clsx({
            "pr-px": isExternal,
          })}
        >
          {children}
        </span>
        {isExternal && <ExternalLinkIcon />}
      </a>
    )
  }

  return (
    <span className={`mr-1 ${className}`} {...props}>
      {isFootnote ? <>[{children}]</> : children}
    </span>
  )
}
