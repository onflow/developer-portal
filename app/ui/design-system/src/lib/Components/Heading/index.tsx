import clsx from "clsx"
import React, { createElement } from "react"
import LinkIcon from "./LinkIcon"

type HeadingType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export type HeadingProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & { type?: HeadingType }

const headingClasses = {
  h1: "text-4xl mb-4 font-bold",
  h2: "text-2xl mb-4",
  h3: "text-xl mb-4",
  h4: "text-lg mb-2",
  h5: "text-base",
  h6: "text-sm",
}

function parameterize(string: string) {
  return string
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 -]/g, "")
    .replace(/ /g, "-")
}

function processChildren(children: any) {
  return children.reduce((acc: string, curr: any) => {
    if (typeof curr === "string") {
      acc += curr
    } else if (typeof curr === "object") {
      acc += curr.props.children
    }
    return acc
  }, "")
}

export function Heading({
  type = "h1",
  children,
  className,
  ...props
}: HeadingProps) {
  const text =
    typeof children === "string" ? children : processChildren(children)
  const anchor = parameterize(text)

  return createElement(
    type,
    {
      ...props,
      id: anchor,
      className: clsx("mt-6 font-semibold", headingClasses[type], className),
    },
    <div className="group -ml-11 flex items-center">
      <a
        href={`#${anchor}`}
        title={text}
        className="mr-2 -mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 group-hover:visible dark:bg-primary-gray-dark dark:hover:bg-gray-700 md:invisible md:scale-100"
      >
        <LinkIcon />
      </a>
      <span className="ml-1 flex-1">{children}</span>
    </div>
  )
}
