import { NavLink } from '@remix-run/react';
import clsx from 'clsx';
import { MDXContentProps } from 'mdx-bundler/client';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type InternalTocItem = {
  id: string;
  value: string;
};

export type InternalTocProps = {
  headings: InternalTocItem[];
};

export function getHeadingsFromMdxComponent(
  Component: React.FunctionComponent<MDXContentProps>
) {
  return Component({})
    ?.props.children.filter((c: { type: string }) => c.type === 'h2')
    .map(({ props }: { props: { id: string; children: string } }) => ({
      id: props.id,
      value: props.children,
    }));
}

export function InternalToc({ headings }: InternalTocProps) {
  const [hash, setHash] = useState('');
  const location = useLocation();
  useEffect(() => {
    setHash(location.hash);
  }, [location.hash]);

  return (
    <div className="sticky top-0 ml-auto hidden h-auto w-[220px] shrink-0 flex-col self-start pt-4 lg:flex">
      <div className="mb-6 px-5 text-2xs uppercase text-gray-500">
        On this page
      </div>
      <div className="border-l-1 border-l border-l-gray-100 bg-opacity-80 dark:border-l-gray-800">
        {headings.map(({ id, value }) => {
          const path = `#${id}`;
          return (
            <div className="flex" key={id}>
              <NavLink
                to={path}
                className={clsx(
                  'mb-1 py-2 px-5 text-sm text-gray-600 hover:opacity-75 dark:text-gray-200',
                  {
                    'bg-gray-100 bg-opacity-75 font-semibold text-primary dark:bg-gray-800 dark:text-gray-300':
                      hash === path,
                  }
                )}
              >
                {value}
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}
