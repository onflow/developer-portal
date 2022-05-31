import React from 'react';
import { formatDistance } from 'date-fns';
import { ReactComponent as ExternalLinkIcon } from '../../../../images/content/external-link.svg';
import { ReactComponent as TimeIcon } from '../../../../images/content/date.svg';

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
      <div className="flex-col bg-white width-full rounded-xl hover:cursor-pointer hover:shadow-2xl dark:bg-primary-dark-gray md:w-96">
        <div className="flex-col px-6 pt-6 border-b border-b-1 border-b-primary-gray-100 dark:border-b-primary-gray-400">
          <div className="flex">
            <div className="mr-8 text-xl">&ldquo;{message}&rdquo;</div>
            <ExternalLinkIcon />
          </div>
          <div
            className="pb-2 text-sm text-primary-gray-300"
            style={{ lineHeight: '48px' }}
          >
            {username} on <span className="text-primary-blue">Discord</span>
          </div>
        </div>
        <div className="flex items-center px-6 py-3 text-light text-primary-gray-300">
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
