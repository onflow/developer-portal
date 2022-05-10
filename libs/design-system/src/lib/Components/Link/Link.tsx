import { NavLink } from '@remix-run/node';
import clsx from 'clsx';
import ExternalLinkIcon from './ExternalLinkIcon';

const defaultClasses =
  'relative text-blue inline-flex items-center dark:text-gray-200 hover:opacity-75';

export type LinkProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    'data-footnote-ref'?: boolean;
  },
  HTMLAnchorElement
>;

export function Link({ children, className, id, href, ...props }: LinkProps) {
  const isExternal = href?.match(/^(www|http)/i);
  const isFootnote = !!props['data-footnote-ref'];

  const classes = clsx(defaultClasses, className, {
    'border-b border-b-1 border-blue dark:border-gray-200 stroke-blue dark:stroke-gray-200 border-solid':
      !isFootnote,
    'ml-0.5': isFootnote,
  });

  if (isExternal) {
    return (
      <a target="blank" rel="noreferrer" href={href || ''} className={classes}>
        <span className="pr-3.5">{children}</span>
        {isExternal && (
          <span className="absolute -right-2">
            <ExternalLinkIcon />
          </span>
        )}
      </a>
    );
  }

  return (
    <NavLink className={classes} to={href || '/'}>
      <span className="mr-1">{isFootnote ? <>[{children}]</> : children}</span>
    </NavLink>
  );
}
