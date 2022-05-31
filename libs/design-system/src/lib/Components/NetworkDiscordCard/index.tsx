import React from 'react';
import { formatDistance } from 'date-fns';
import { ContentExternalLinkIcon, TimeIcon } from '../Icons';

export type NetworkDiscordCardProps = {
  message: string;
  username: string;
  timestamp: Date;
  messageLink: string;
};

const NetworkDiscordCard = ({
  message,
  username,
  timestamp,
  messageLink,
}: NetworkDiscordCardProps) => {
  return (
    <a href={messageLink}>
      <div className="sm:width-full flex-col rounded-xl bg-white hover:cursor-pointer hover:shadow-2xl dark:bg-primary-gray-dark md:w-96">
        <div className="border-b-1 flex-col border-b border-b-primary-gray-100 px-6 pt-6 dark:border-b-primary-gray-400">
          <div className="flex">
            <div className="mr-8 text-xl">&ldquo;{message}&rdquo;</div>
            <ContentExternalLinkIcon />
          </div>
          <div
            className="pb-2 text-sm text-primary-gray-300"
            style={{ lineHeight: '48px' }}
          >
            {username} on <span className="text-primary-blue">Discord</span>
          </div>
        </div>
        <div className="text-light flex items-center px-6 py-3 text-primary-gray-300">
          <TimeIcon />
          <span className="ml-2">
            {formatDistance(timestamp, new Date())} ago
          </span>
        </div>
      </div>
    </a>
  );
};

export default NetworkDiscordCard;
