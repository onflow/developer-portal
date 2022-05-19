import { NavLink } from '@remix-run/react';
import clsx from 'clsx';
import {
  InternalSidebarMenu,
  InternalSidebarMenuProps,
} from '../InternalSidebarMenu';

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
} & InternalSidebarMenuProps;

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

// TODO: Remove NavLink dependency
export function InternalSidebar({
  config,
  selectedSectionType,
}: InternalSidebarProps) {
  return (
    <div className="w-full h-full p-8 mb-8 mr-3 min-w-min shrink-0 bg-misc-sidebar-gray bg-opacity-80 dark:bg-misc-off-black-bg md:mb-0 md:w-80">
      <div className="mb-2">
        <InternalSidebarMenu selectedSectionType={selectedSectionType} />
      </div>
      {config.sections.map((section) => (
        <div
          className="pt-6 pb-3 border-t border-t-1 border-t-gray-300 dark:border-t-primary-gray-300"
          key={section.title}
        >
          <div className="mb-4 text-xs uppercase text-primary-gray-300 dark:text-primary-gray-200">
            {section.title}
          </div>
          <div className="px-2">
            {section.items.map((item) => (
              <NavLink
                to={item.href}
                key={item.label}
                className={({ isActive }) =>
                  clsx(
                    'mb-1 block rounded-md px-2 py-1.5 text-sm text-primary-gray-400 hover:opacity-75 dark:text-primary-gray-100',
                    {
                      'bg-gray-200 bg-opacity-50 text-primary-blue dark:bg-gray-700 dark:text-primary-gray-300':
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
