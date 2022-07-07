import { Link } from "@remix-run/react"
import React from "react"

export function isLinkExternal(url: string) {
  return /^(https?:\/\/|www\.)/.test(url)
}

const AppLink = ({
  to,
  className,
  title,
  style,
  children,
}: {
  to: string
  title?: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) => {
  const classes = className || "hover:opacity-75"
  if (isLinkExternal(to))
    return (
      <a
        href={to}
        target="blank"
        rel="noreferrer"
        className={classes}
        title={title}
      >
        {children}
      </a>
    )

  return (
    <Link to={to} className={classes} title={title} style={style}>
      {children}
    </Link>
  )
}

export default AppLink
