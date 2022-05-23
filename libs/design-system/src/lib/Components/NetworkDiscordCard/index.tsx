import React from 'react';
import { formatDistance } from 'date-fns';
import { ContentExternalLinkIcon, TimeIcon } from '../icons';

export type NetworkDiscordCardProps = {
  message: string;
  username: string;
  timestamp: Date;
  messageLink: string;
};

const NetworkDiscordCard = ({ message, username, timestamp, messageLink }: NetworkDiscordCardProps) => {
  return (
    <a href={messageLink}>
      <div className='flex-col bg-white rounded-xl hover:shadow-2xl hover:cursor-pointer dark:bg-primary-dark-gray md:w-96 sm:width-full'>
        <div className="flex-col px-6 pt-6 border-b border-b-1 border-b-primary-gray-100 dark:border-b-primary-gray-400">
          <div className='flex'>
            <div className="mr-8 text-xl">&ldquo;{message}&rdquo;</div>
            <ContentExternalLinkIcon />
          </div>
          <div className='pb-2 text-sm text-primary-gray-300' style={{ lineHeight: '48px' }}>{username} on <span className='text-primary-blue'>Discord</span></div>
        </div>
        <div className='flex items-center px-6 py-3 text-light text-primary-gray-300'>
          <TimeIcon />
          <span className="ml-2">{formatDistance(timestamp, new Date())} ago</span>
        </div>
      </div>
    </a>

  );
}

export default NetworkDiscordCard;
