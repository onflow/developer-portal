import { NavLink } from '@remix-run/react';
import clsx from 'clsx';

type InternalSidebarSectionItem = {
  label: string;
  href: string;
};

type InternalSidebarSection = {
  title: string;
  items: InternalSidebarSectionItem[];
};

export type InternalSidebarConfig = {
  sections: InternalSidebarSection[];
};

export type InternalSidebarProps = {
  config: InternalSidebarConfig;
};

export const TEMP_SIDEBAR_CONFIG: InternalSidebarConfig = {
  sections: [
    {
      title: 'Api Documentation',
      items: [
        {
          label: 'Quick Reference',
          href: '/cadence/language',
        },
        {
          label: 'Configuration',
          href: '/configuration',
        },
        {
          label: 'Authentication',
          href: '/authentication',
        },
        {
          label: 'Proving Account Ownership',
          href: '/proving-account-ownership',
        },
      ],
    },
    {
      title: 'Guides and Tutorials',
      items: [
        {
          label: 'Introducing @onflow/fcl',
          href: '/introducing-onflow-fcl',
        },
      ],
    },
  ],
};

export function InternalSidebar({ config }: InternalSidebarProps) {
  return (
    <div className="w-full p-8 mb-8 mr-3 bg-gray-100 min-w-min shrink-0 bg-opacity-80 dark:bg-gray-800 md:mb-0 md:w-80">
      {config.sections.map((section) => (
        <div
          className="py-4 mb-2 border-b border-b-1 border-b-gray-300 last:border-b-0 dark:border-b-gray-700"
          key={section.title}
        >
          <div className="mb-4 text-xs text-gray-500 uppercase dark:text-gray-200">
            {section.title}
          </div>
          <div className="px-4">
            {section.items.map((item) => (
              <NavLink
                to={item.href}
                key={item.label}
                className={({ isActive }) =>
                  clsx(
                    'mb-1 block rounded-md px-2 py-1.5 text-sm text-primary-gray-400 hover:opacity-75 dark:text-gray-200',
                    {
                      'bg-gray-200 bg-opacity-50 text-primary-blue dark:bg-gray-700 dark:text-gray-300':
                        isActive,
                    }
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
