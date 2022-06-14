import clsx from "clsx"
import { ReactComponent as ChevronRight } from "../../../../images/arrows/chevron-right"
import { ReactComponent as ExternalLinkIcon } from "../../../../images/content/external-link"
import { isLinkExternal } from "../Link/isLinkExternal"
import Tag from "../Tag"

export type LinkCard3ColumnItemProps = {
  description: string
  icon?: React.ReactNode
  title: string
  links: Array<{
    href: string
    title: string
    tags?: string[]
  }>
}

export type LinkCard3ColumnProps = {
  items: [
    LinkCard3ColumnItemProps,
    LinkCard3ColumnItemProps,
    LinkCard3ColumnItemProps
  ]
  topRounded?: boolean
}

export function LinkCard3Column({
  items,
  topRounded = true,
}: LinkCard3ColumnProps) {
  const classes = clsx(
    "grid grid-cols-1 pb-8 bg-white rounded-lg gap-x-4 dark:bg-primary-gray-dark md:grid-cols-3 md:flex-row md:px-10",
    {
      "rounded-tr-none rounded-tl-none": !topRounded,
    }
  )

  return (
    <div className="container">
      <div className={classes}>
        {items.map((item, index) => (
          <div
            key={`${item.title}-header`}
            className={clsx("px-10 pt-16 md:row-start-1", {
              "row-start-1": index === 0,
              "row-start-3": index === 1,
              "row-start-5": index === 2,
              "grid-column-start-1": index === 0,
              "grid-column-start-2": index === 1,
              "grid-column-start-3": index === 2,
            })}
          >
            <h5 className="text-h5 mb-2 flex items-center">
              {item.icon && <span className="mr-2">{item.icon}</span>}{" "}
              {item.title}
            </h5>
            <p className="mb-2 text-primary-gray-300 dark:text-primary-gray-50">
              {item.description}
            </p>
          </div>
        ))}
        {items.map((item, index) => (
          <div
            key={`${item.title}-content`}
            className={clsx(
              "divide-y divide-primary-gray-100 px-6 dark:divide-primary-gray-400 md:row-start-2 md:pb-8",
              {
                "row-start-2": index === 0,
                "row-start-4": index === 1,
                "row-start-6": index === 2,
              }
            )}
          >
            {item.links?.map((link) => (
              <div key={link.title} className="divided-item-hover">
                <a
                  className="link-card-3-column-link group flex flex-col rounded-lg px-4 hover:bg-primary-gray-50 dark:hover:bg-primary-gray-400"
                  href={link.href}
                >
                  <span className="display-block py-4">
                    <div className="flex justify-between">
                      {link.title}
                      <div>
                        {isLinkExternal(link.href) ? (
                          <ExternalLinkIcon />
                        ) : (
                          <ChevronRight />
                        )}
                      </div>
                    </div>
                    <div>
                      {link.tags?.map((tag) => (
                        <Tag key={tag} name={tag} />
                      ))}
                    </div>
                  </span>
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
