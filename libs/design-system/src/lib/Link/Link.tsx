import clsx from 'clsx';
import ExternalLinkIcon from './ExternalLinkIcon';

const defaultClasses =
  'relative border-b border-b-1 border-primary border-solid text-primary inline-flex items-center hover:opacity-75';

type LinkProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLAnchorElement> & {
    href?: string;
  },
  HTMLAnchorElement
>;

export function Link({ children, className, href, ...props }: LinkProps) {
  const isExternal = href?.match(/^(www|http)/i);
  const classes = clsx(defaultClasses, className);
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
      <span className="mr-1">{children}</span>
    </a>
  );
}
