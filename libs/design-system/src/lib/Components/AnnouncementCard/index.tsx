import React from 'react';
import { formatDistance } from 'date-fns';
import { ReactComponent as ChevronRightIcon } from '../../../../images/arrows/chevron-right.svg';
import { ReactComponent as TimeIcon } from '../../../../images/content/date.svg';

export type AnnouncementCardProps = {
  sourceIcon: string;
  sourceAltText: string;
  heading: string;
  timestamp: Date;
  link: string;
};

const AnnouncementCard = ({
  heading,
  sourceIcon,
  sourceAltText,
  timestamp,
  link,
}: AnnouncementCardProps) => {
  return (
    <a
      href={link}
      className="flex items-center justify-between rounded-2xl bg-white px-4 py-9 hover:shadow-2xl dark:bg-primary-dark-gray md:px-8 md:py-6"
    >
      <div className="mr-4 mr-1 self-start">
        <img
          src={sourceIcon}
          alt={sourceAltText}
          width={50}
          height="auto"
          className="mr-4 rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="text-2xl text-xl font-bold">{heading}</div>
        <div className="mt-4 flex items-center text-primary-gray-300">
          <TimeIcon />
          <span className="ml-2">
            {formatDistance(timestamp, new Date())} ago
          </span>
        </div>
      </div>
      <div className="md:mt-0">
        <ChevronRightIcon />
      </div>
    </a>
  );
};

export default AnnouncementCard;
