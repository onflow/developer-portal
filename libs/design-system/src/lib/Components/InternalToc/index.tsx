import clsx from 'clsx';
import { useEffect, useState } from 'react';

type InternalTocItem = {
  id: string;
  value: string;
};

export type InternalTocProps = {
  headings: InternalTocItem[];
  location: URL;
};

export function getHeadingsFromMdxComponent(
  Component: React.FunctionComponent<{
    [props: string]: unknown;
    components?: import('mdx/types').MDXComponents | undefined;
  }>
) {
  return Component({})
    ?.props.children.filter((c: { type: string }) => c.type === 'h2')
    .map(({ props }: { props: { id: string; children: string } }) => ({
      id: props.id,
      value: props.children,
    }));
}

export function InternalToc({ headings, location }: InternalTocProps) {
  const [hash, setHash] = useState('');
  useEffect(() => {
    setHash(location.hash);
  }, [location.hash]);

  return (
    <div className="sticky top-0 ml-auto hidden h-auto w-[220px] shrink-0 flex-col self-start pt-4 lg:flex">
      <div className="px-5 mb-6 text-gray-500 uppercase text-2xs">
        On this page
      </div>
      <div className="border-l border-l-1 border-l-gray-100 bg-opacity-80 dark:border-l-gray-800">
        {headings.map(({ id, value }) => {
          const path = `#${id}`;
          return (
            <div className="flex" key={id}>
              <a
                href={path}
                className={clsx(
                  'mb-1 py-2 px-5 text-sm text-main-gray-400 hover:opacity-75 dark:text-gray-200',
                  {
                    'bg-gray-100 bg-opacity-75 font-semibold text-blue dark:bg-gray-800 dark:text-gray-300':
                      hash === path,
                  }
                )}
              >
                {value}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
