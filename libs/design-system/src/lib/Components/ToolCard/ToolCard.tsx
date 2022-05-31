import React from 'react';

import { ReactComponent as StarIcon } from '../../../../images/action/star.svg';
import { ReactComponent as CalendarIcon } from '../../../../images/action/date-calendar.svg';
import { ReactComponent as CommitIcon } from '../../../../images/content/commit.svg';
import Tag from '../Tag';

interface ToolCardCommonProps {
  title: string;
  authorIcon: string;
  authorName: string;
  tags: string[];
  link: string;
  stars: number;
  toolIcon: string;
}

// ensure that each type of tool card gets its required props and excludes its unused ones
type ToolCardContentProps =
  | {
      type: 'sdk';
      lastCommit: string;
      lastRelease: string;
      description?: never;
    }
  | {
      type: 'tool';
      lastCommit?: never;
      lastRelease?: never;
      description: string;
    };

export type ToolCardProps = ToolCardCommonProps & ToolCardContentProps;

export function ToolCard({
  title,
  authorIcon,
  authorName,
  tags,
  link,
  stars,
  toolIcon,
  type,
  lastCommit,
  lastRelease,
  description,
}: ToolCardProps) {
  return (
    <a
      className="flex gap-4 rounded-lg bg-white py-6 px-8 dark:bg-primary-dark-gray"
      href={link}
    >
      <div>
        <div className="min-w-16 h-16 w-16 rounded-lg p-3 shadow-tool-card-icon	backdrop-blur-2xl dark:bg-dark-tool-card-icon">
          <img src={toolIcon} />
        </div>
      </div>
      <div className="grow">
        <h5 className="text-h5">{title}</h5>
        <div className="flex items-center">
          <div className="flex shrink-0 items-center gap-2 pr-3 md:pr-4">
            <div>
              <img src={authorIcon} alt={authorName} width={24} height={24} />
            </div>
            <div className="dark:gray-400 md:leading-1 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400 md:text-xs">
              {authorName}
            </div>
          </div>

          <div className="shrink-0 pr-1 line-clamp-1">
            {tags.map((tag, i) => (
              <Tag name={tag} key={i} />
            ))}
          </div>

          <div className="flex shrink-0 gap-1">
            <StarIcon
              className="h-fit fill-amber-400 stroke-amber-400"
              width={14}
              height={14}
            />
            <div className="md:leading-1 h-fit text-sm text-gray-500 dark:text-gray-300 md:text-xs">
              {stars}
            </div>
          </div>
        </div>
        {type === 'sdk' ? (
          <div className="align-center -mb-1 grid w-fit grid-cols-1 gap-x-4 justify-self-center pt-6 text-xs text-gray-500 md:grid-cols-2	">
            <div className="flex items-center">
              <CalendarIcon
                className="mr-3 stroke-gray-500"
                width={22}
                height={18}
              />
              <div>{lastRelease} days ago</div>
            </div>

            <div className="flex items-center">
              <CommitIcon
                className="mr-3 fill-gray-500"
                width={22}
                height={22}
              />
              <div>{lastCommit}</div>
            </div>
          </div>
        ) : type === 'tool' ? (
          <div className="pt-2 text-gray-700 line-clamp-2 dark:text-gray-300">
            {description}
          </div>
        ) : null}
      </div>
    </a>
  );
}
