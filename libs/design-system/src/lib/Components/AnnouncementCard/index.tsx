import clsx from 'clsx';
import React from 'react';
import { Heading } from '../Heading/Heading';
import { ChevronIcon, TimeIcon } from '../icons';

export type AnnouncementCardProps = {
  sourceIcon: string;
  sourceAltText: string;
  heading: string;
  timestamp: string;
  link: string;
}

const AnnouncementCard = ({ heading, sourceIcon, sourceAltText, timestamp, link }: AnnouncementCardProps) => {
  return (
    <div className="bg-white rounded-2xl flex items-center justify-around py-4 px-12">
      <img src={sourceIcon} alt={sourceAltText} />
      <Heading type="h2">{heading}</Heading>
      <div>
        <TimeIcon />
        {timestamp}
      </div>
      <a href={link}><ChevronIcon /></a>
    </div>
  )
}

export default AnnouncementCard;
