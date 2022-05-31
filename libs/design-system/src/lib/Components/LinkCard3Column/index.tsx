import clsx from 'clsx';
import { ReactComponent as ChevronRight } from '../../../../images/arrows/chevron-right.svg';
import { ReactComponent as ExternalLinkIcon } from '../../../../images/content/external-link.svg';
import { isLinkExternal } from '../Link/isLinkExternal';
import Tag from '../Tag';

export type LinkCard3ColumnItemProps = {
  description: string;
  icon?: React.ReactNode;
  title: string;
  links: Array<{
    href: string;
    title: string;
    tags?: string[];
  }>;
};

export type LinkCard3ColumnProps = {
  items: [
    LinkCard3ColumnItemProps,
    LinkCard3ColumnItemProps,
    LinkCard3ColumnItemProps
  ];
};

export function LinkCard3Column({ items }: LinkCard3ColumnProps) {
  return (
    <div className="grid grid-cols-1 gap-x-4 rounded-lg bg-white pb-8 dark:bg-primary-dark-gray md:grid-cols-3 md:flex-row">
      {items.map((item, index) => (
        <div
          key={`${item.title}-header`}
          className={clsx('px-10 pt-16 md:row-start-1', {
            'row-start-1': index === 0,
            'row-start-3': index === 1,
            'row-start-5': index === 2,
            'grid-column-start-1': index === 0,
            'grid-column-start-2': index === 1,
            'grid-column-start-3': index === 2,
          })}
        >
          <h5 className="text-h5 mb-2 flex items-center">
            {item.icon && <span className="mr-2">{item.icon}</span>}{' '}
            {item.title}
          </h5>
          <p className="text-primary-gray-300 dark:text-primary-gray-50">
            {item.description}
          </p>
        </div>
      ))}
      {items.map((item, index) => (
        <div
          key={`${item.title}-content`}
          className={clsx('px-6 md:row-start-2 md:pb-8', {
            'row-start-2': index === 0,
            'row-start-4': index === 1,
            'row-start-6': index === 2,
          })}
        >
          {item.links?.map((link, index) => (
            <a
              key={link.title}
              className="link-card-3-column-link group flex flex-col rounded-lg px-4 hover:bg-primary-gray-200"
              href={link.href}
            >
              <span
                className={clsx('display-block py-4', {
                  'border-t border-t-primary-gray-200 dark:border-t-primary-gray-300 dark:group-hover:border-t-primary-gray-200':
                    index > 0,
                })}
              >
                <span className="flex justify-between">
                  <span className="group-hover:text-primary-blue">
                    {link.title}
                  </span>
                  <span className="pt-1 dark:group-hover:text-black">
                    {isLinkExternal(link.href) ? (
                      <ExternalLinkIcon height="16" />
                    ) : (
                      <ChevronRight height="16" />
                    )}
                  </span>
                </span>
                <span>
                  {link.tags?.map((tag) => (
                    <Tag key={tag} name={tag} />
                  ))}
                </span>
              </span>
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}
