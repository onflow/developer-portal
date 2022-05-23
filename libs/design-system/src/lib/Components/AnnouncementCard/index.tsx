import React from 'react';
import { formatDistance } from 'date-fns';
import { RightChevronIcon, TimeIcon } from '../icons';

export type AnnouncementCardProps = {
  sourceIcon: string;
  sourceAltText: string;
  heading: string;
  timestamp: Date;
  link: string;
}

const AnnouncementCard = ({ heading, sourceIcon, sourceAltText, timestamp, link }: AnnouncementCardProps) => {
  return (
    <a href={link} className="flex items-center justify-between px-8 py-6 bg-white rounded-2xl dark:bg-primary-dark-gray sm:px-4 hover:shadow-2xl">
      <div className="mr-4 sm:mr-1">
        <img src={sourceIcon} alt={sourceAltText} width={50} height="auto" className="mr-4 rounded-full" />
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold sm:text-xl">{heading}</h2>
        <div className="flex items-center text-primary-gray-300">
          <TimeIcon />
          <span className="ml-2">{formatDistance(timestamp, new Date())} ago</span>
        </div>
      </div>
      <div className="md:mt-0 lg:mt-0"><RightChevronIcon /></div>
    </a>
  )
}

export default AnnouncementCard;
