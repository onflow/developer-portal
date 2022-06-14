import { ReactComponent as ChevronRight } from "../../../../images/arrows/chevron-right"
import { ReactComponent as ExternalLinkIcon } from "../../../../images/content/external-link"
import { isLinkExternal } from "../Link/isLinkExternal"
import { LinkCard2ColumnItemContainer } from "./LinkCard2ColumnItemContainer"

export type LinkCard2ColumnItemBaseProps = {
  description: string
  icon?: string
  iconAltText?: string
  title: string
}

export type LinkCard2ColumnItemSingleLinkProps =
  LinkCard2ColumnItemBaseProps & {
    href: string
    links?: never
  }

export type LinkCard2ColumnItemMultipleLinksProps =
  LinkCard2ColumnItemBaseProps & {
    href?: never
    links?: Array<{
      href: string
      title: string
    }>
  }

export type LinkCard2ColumnItemProps =
  | LinkCard2ColumnItemSingleLinkProps
  | LinkCard2ColumnItemMultipleLinksProps

export function LinkCard2ColumnItem({
  description,
  href,
  icon,
  iconAltText = "",
  links,
  title,
}: LinkCard2ColumnItemProps) {
  return (
    <LinkCard2ColumnItemContainer href={links?.length ? undefined : href}>
      {icon && (
        <div className="mr-4 mb-4 max-w-[58px] shrink-0 grow-0 basis-[58px] md:max-w-[84px] md:basis-[84px]">
          <img
            src={icon}
            alt={iconAltText}
            width="100%"
            className="rounded-lg"
          />
        </div>
      )}
      <div className="w-full overflow-hidden pr-2">
        <h3 className="text-semibold mr-1 text-xl text-black dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm text-primary-gray-300 dark:text-primary-gray-200">
          {description}
        </p>
        {links && (
          <div className="mt-3">
            {links.map(({ title, href }) => (
              <a
                className="mb-1 flex items-center justify-between text-sm font-semibold text-primary-blue hover:opacity-75 dark:text-blue-dark"
                key={title}
                href={href}
              >
                <span>{title}</span>
                <span>
                  {isLinkExternal(href) ? (
                    <ExternalLinkIcon />
                  ) : (
                    <ChevronRight />
                  )}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </LinkCard2ColumnItemContainer>
  )
}
