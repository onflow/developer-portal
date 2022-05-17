import clsx from 'clsx';
import React from 'react';
import { formatDistance } from 'date-fns';
import { ChevronIcon, TimeIcon } from '../icons';

export type AnnouncementCardProps = {
  sourceIcon: string;
  sourceAltText: string;
  heading: string;
  timestamp: Date;
  link: string;
}

const AnnouncementCard = ({ heading, sourceIcon, sourceAltText, timestamp, link }: AnnouncementCardProps) => {
  return (
    <div className="bg-white rounded-2xl flex items-center py-4 px-11 justify-between dark:bg-gray-800">
      <img src={sourceIcon} alt={sourceAltText} width={40} />
      <div className="ml-9">
        <h2>{heading}</h2>
        <div className="flex text-primary-gray-300 items-center">
          <TimeIcon />
          <span className="ml-2">{formatDistance(timestamp, new Date())} ago</span>
        </div>
      </div>
      <a href={link}><ChevronIcon /></a>
    </div>
  )
}

export default AnnouncementCard;
