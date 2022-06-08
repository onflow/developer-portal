import React from "react"
import { ReactComponent as ChevronRight } from '../../../../images/arrows/chevron-right.svg';
import {
  ContentNavigationIcon,
  ContentNavigationIconProps,
} from './ContentNavigationIcon';

export type ContentNavigationProps = {
  title: string;
  text: string;
  link: string;
} & ContentNavigationIconProps;

export function ContentNavigation({
  title,
  text,
  link,
  icon,
}: ContentNavigationProps) {
  return (
    <a
      className="flex items-center gap-8 p-12 text-gray-700 rounded-lg bg-primary-gray-100/40"
      href={link}
    >
      <div className="grow">
        <div className="mb-3 text-primary-gray-400 dark:text-primary-gray-100">
          <ContentNavigationIcon icon={icon} />
        </div>
        <div className="mb-2 text-h4 dark:text-white">{title}</div>
        <div className="dark:text-primary-gray-100">{text}</div>
      </div>
      <div className="text-black dark:text-primary-gray-100">
        <ChevronRight />
      </div>
    </a>
  );
}
