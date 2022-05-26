import { ReactComponent as ChevronRight } from '../../../../images/arrows/chevron-right.svg';
import { ReactComponent as ExternalLinkIcon } from '../../../../images/content/external-link.svg';
import { isLinkExternal } from '../Link/isLinkExternal';
import { LinkCard2ColumnItemContainer } from './LinkCard2ColumnItemContainer';

export type LinkCard2ColumnLinkItemBaseProps = {
  description: string;
  icon?: string;
  iconAltText?: string;
  title: string;
};

export type LinkCard2ColumnLinkItemSingleLinkProps =
  LinkCard2ColumnLinkItemBaseProps & {
    href: string;
    links?: never;
  };

export type LinkCard2ColumnLinkItemMultipleLinksProps =
  LinkCard2ColumnLinkItemBaseProps & {
    href?: never;
    links: Array<{
      href: string;
      title: string;
    }>;
  };

export type LinkCard2ColumnLinkItemProps =
  | LinkCard2ColumnLinkItemSingleLinkProps
  | LinkCard2ColumnLinkItemMultipleLinksProps;

export function LinkCard2ColumnLinkItem({
  description,
  href,
  icon,
  iconAltText = '',
  links,
  title,
}: LinkCard2ColumnLinkItemProps) {
  return (
    <LinkCard2ColumnItemContainer href={href}>
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
        <h3 className="text-semibold mr-1  text-xl text-black group-hover:opacity-75 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm text-primary-gray-300 dark:text-primary-gray-200">
          {description}
        </p>
        {links && (
          <div className="mt-3">
            {links.map(({ title, href }) => (
              <a
                className="mb-1 flex justify-between text-xs text-primary-blue"
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
  );
}
