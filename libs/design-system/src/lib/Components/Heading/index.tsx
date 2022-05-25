import clsx from 'clsx';
import { createElement } from 'react';
import LinkIcon from './LinkIcon';

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & { type?: HeadingType };

const defaultClasses = 'mt-6 font-semibold';

const headingClasses = {
  h1: 'text-4xl mb-24 font-bold',
  h2: 'text-2xl mb-6',
  h3: 'text-xl mb-4',
  h4: 'text-lg mb-2',
  h5: 'text-base',
  h6: 'text-sm',
};

function parameterize(string: string) {
  return string
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/ /g, '-');
}

export function Heading({
  type = 'h1',
  children,
  className = '',
  ...props
}: HeadingProps) {
  const text = typeof children === 'string' ? children : '';
  const anchor = parameterize(text);
  return createElement(
    type,
    {
      ...props,
      id: anchor,
      className: clsx(defaultClasses, headingClasses[type], className),
    },
    <div className="flex group -ml-11">
      <a
        href={`#${anchor}`}
        title={text}
        className="flex items-center justify-center w-8 h-8 mr-3 scale-75 bg-gray-100 rounded-md hover:bg-gray-200 group-hover:visible dark:bg-primary-dark-gray dark:hover:bg-gray-700 md:invisible md:scale-100"
      >
        <LinkIcon />
      </a>
      {children}
    </div>
  );
}
