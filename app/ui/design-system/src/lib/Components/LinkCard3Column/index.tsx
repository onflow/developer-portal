import clsx from "clsx"
import { ReactComponent as ChevronRight } from "../../../../images/arrows/chevron-right"
import { ReactComponent as ExternalLinkIcon } from "../../../../images/content/external-link"
import { isLinkExternal } from "../../utils/isLinkExternal"
import AppLink from "../AppLink"
import {
  HomepageStartItemIcons,
  HomepageStartItemIconsProps,
} from "../HomepageStartItem/HomepageStartIcons"
import Tag from "../Tag"

export type LinkCard3ColumnItemProps = {
  icon?: React.ReactNode
  title: string
  links: Array<{
    href: string
    title: string
    tags?: string[]
  }>
}

export type LinkCard3ColumnItems = [
  LinkCard3ColumnItemProps,
  LinkCard3ColumnItemProps,
  LinkCard3ColumnItemProps
]

export type LinkCard3ColumnProps = {
  items: LinkCard3ColumnItems
  topRounded?: boolean
  activeTab: string
  icon: HomepageStartItemIconsProps
  title: string
}

// content coming from Dmitrii next PR
const learnContent: LinkCard3ColumnItemProps[] = []
const quickstartContent: LinkCard3ColumnItemProps[] = []
const documentationContent: LinkCard3ColumnItemProps[] = []

export function LinkCard3Column({
  activeTab,
  items,
  topRounded = true,
}: LinkCard3ColumnProps) {
  const classes = clsx(
    "grid grid-cols-1 pb-8 bg-white mt-2 rounded-lg gap-x-4 dark:bg-primary-gray-dark md:grid-cols-3 md:flex-row md:px-10",
    {
      "rounded-tr-none rounded-tl-none": !topRounded,
    }
  )

  const getTitle = () => {
    switch (activeTab) {
      case "learn":
        return " Learn Flow"
      case "quickstart":
        return " Flow Quickstarts"
      case "documentation":
        return " Documentation"
      default:
        throw new Error("active tab not recognized")
    }
  }

  const getContent = () => {
    switch (activeTab) {
      case "learn":
        return learnContent
      case "quickstart":
        return quickstartContent
      case "documentation":
        return documentationContent
      default:
        throw new Error("active tab not recognized")
    }
  }

  return (
    <div className="container">
      <div className={classes}>
        <a
          href="/tools"
          key={`${activeTab}-header`}
          className={clsx(
            " mx-4 mt-4 rounded-lg px-6 pt-4 hover:bg-primary-gray-50 dark:hover:bg-primary-gray-400 md:row-start-1",
            {
              "row-start-1": true,
              "grid-column-start-1": true,
            }
          )}
        >
          <h5 className="text-h5 mb-2 flex flex-col items-start justify-start">
            <HomepageStartItemIcons icon={activeTab} />
            {getTitle()}
          </h5>
        </a>
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
                <AppLink
                  className="link-card-3-column-link group flex flex-col rounded-lg px-4 hover:bg-primary-gray-50 dark:hover:bg-primary-gray-400"
                  to={link.href}
                >
                  <span className="display-block py-4">
                    <div className="flex justify-between">
                      {link.title}
                      <div>
                        {isLinkExternal(link.href) ? (
                          // "artificial" centering due to viewbox adding padding
                          <div className="pr-[3px] pt-[2px]">
                            <ExternalLinkIcon />
                          </div>
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
                </AppLink>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
