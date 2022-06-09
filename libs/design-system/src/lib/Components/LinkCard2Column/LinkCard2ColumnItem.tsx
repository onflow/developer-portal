import { ReactComponent as ChevronRight } from '../../../../images/arrows/chevron-right.svg';
import { ReactComponent as ExternalLinkIcon } from '../../../../images/content/external-link.svg';
import { isLinkExternal } from '../Link/isLinkExternal';
import { LinkCard2ColumnItemContainer } from './LinkCard2ColumnItemContainer';

export type LinkCard2ColumnItemBaseProps = {
  description: string;
  icon?: string;
  iconAltText?: string;
  title: string;
};

export type LinkCard2ColumnItemSingleLinkProps =
  LinkCard2ColumnItemBaseProps & {
    href: string;
    links?: never;
  };

export type LinkCard2ColumnItemMultipleLinksProps =
  LinkCard2ColumnItemBaseProps & {
    href?: never;
    links: Array<{
      href: string;
      title: string;
    }>;
  };

export type LinkCard2ColumnItemProps =
  | LinkCard2ColumnItemSingleLinkProps
  | LinkCard2ColumnItemMultipleLinksProps;

export function LinkCard2ColumnItem({
  description,
  href,
  icon,
  iconAltText = '',
  links,
  title,
}: LinkCard2ColumnItemProps) {
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
      <div className="w-full pr-2 overflow-hidden">
        <h3 className="mr-1 text-xl text-black text-semibold group-hover:opacity-75 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm text-primary-gray-300 dark:text-primary-gray-200">
          {description}
        </p>
        {links && (
          <div className="mt-3">
            {links.map(({ title, href }) => (
              <a
                className="flex items-center justify-between mb-1 text-sm font-semibold text-primary-blue hover:opacity-75 dark:text-blue-dark"
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
