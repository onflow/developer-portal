import { Link } from "@remix-run/react"
import React, { forwardRef } from "react"

export function isLinkExternal(url: string) {
  return /^(https?:\/\/|www\.)/.test(url)
}

export interface AppLinkProps
  extends Omit<React.ComponentPropsWithRef<"a">, "href"> {
  to: string
}

const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ to, className, ...props }, ref) => {
    const classes = className || "hover:opacity-75"

    if (isLinkExternal(to))
      return (
        <a
          ref={ref}
          href={to}
          target="blank"
          rel="noreferrer"
          className={classes}
          {...props}
        />
      )

    return (
      <Link
        ref={ref}
        to={to}
        className={classes}
        prefetch="intent"
        {...props}
      />
    )
  }
)

AppLink.displayName = "AppLink"

export default AppLink
