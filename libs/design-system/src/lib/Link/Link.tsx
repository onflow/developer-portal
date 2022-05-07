import clsx from 'clsx';
import ExternalLinkIcon from './ExternalLinkIcon';

const defaultClasses =
  'relative text-primary inline-flex items-center hover:opacity-75';

type LinkProps = React.DetailedHTMLProps<
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
    'border-b border-b-1 border-primary border-solid': !isFootnote,
    'ml-0.5': isFootnote,
  });

  if (isExternal) {
    return (
      <a
        href={href}
        target="blank"
        rel="noreferrer"
        {...props}
        className={classes}
      >
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
    <a href={href} {...props} className={classes}>
      <span className="mr-1">{isFootnote ? <>[{children}]</> : children}</span>
    </a>
  );
}
