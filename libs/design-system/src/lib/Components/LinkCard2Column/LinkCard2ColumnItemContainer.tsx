import { ReactComponent as ExternalLinkIcon } from '../../../../images/content/external-link';
import clsx from 'clsx';
import { isLinkExternal } from '../Link/isLinkExternal';

export type LinkCard2ColumnItemContainerProps = React.PropsWithChildren<{
  href?: string;
}>;

export function LinkCard2ColumnItemContainer({
  href,
  children,
}: LinkCard2ColumnItemContainerProps) {
  const className =
    'group mb-4 flex flex-1 flex-col md:flex-row justify-start rounded-lg bg-white px-6 py-5 hover:shadow-2xl dark:bg-primary-gray-400 relative';

  if (href) {
    const isExternal = isLinkExternal(href);

    return (
      <a
        className={clsx(className, 'hover:cursor-pointer ')}
        rel={isExternal ? 'noreferrer' : undefined}
        href={href}
      >
        {isExternal && (
          <span className="absolute right-4">
            <ExternalLinkIcon />
          </span>
        )}
        {children}
      </a>
    );
  }

  return <div className={className}>{children}</div>;
}
