import React from 'react';
import Tag from '../Tag';
import { ReactComponent as CalendarIcon } from '../../../../images/action/date-calendar.svg';
import { ReactComponent as TutorialIcon } from '../../../../images/content/drafting-tools.svg';

export type TutorialCardProps = {
  heading: string;
  tags: string[];
  description: string;
  lastUpdated: string;
  level: string;
  imageUri: string;
  link: string;
};

const TutorialCard: React.FC<TutorialCardProps> = ({
  heading,
  tags,
  description,
  lastUpdated,
  level,
  imageUri,
  link,
}) => {
  return (
    <a
      href={link}
      className="flex max-w-[316px] flex-col overflow-hidden rounded-lg bg-white hover:shadow-2xl dark:bg-primary-gray-dark"
    >
      <img src={imageUri} className="h-[141px] object-cover" />
      <div className="p-4">
        <div className="text-xl font-bold">{heading}</div>
        <div className="my-2">
          {tags.map((tag) => (
            <Tag name={tag} />
          ))}
        </div>
        {description}
        <div className="flex justify-between mt-6 text-sm text-primary-gray-300 dark:text-primary-gray-200">
          <div className="flex items-center">
            <CalendarIcon className="mr-1 scale-75" />
            Updated: {lastUpdated}
          </div>
          <div className="flex items-center">
            <TutorialIcon className="mr-2" />
            {level}
          </div>
        </div>
      </div>
    </a>
  );
};

export default TutorialCard;
