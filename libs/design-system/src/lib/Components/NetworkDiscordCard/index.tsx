import React from 'react';
import { formatDistance } from 'date-fns';
import { ContentExternalLinkIcon } from '../icons';

export type NetworkDiscordCardProps = {
  message: string;
  source: string;
  timestamp: Date;
};

const NetworkDiscordCard = ({ message, source, timestamp }: NetworkDiscordCardProps) => {
  return (
    <div className='flex-col bg-white rounded-xl hover:shadow-2xl hover:cursor-pointer' style={{ width: '350px' }}>
      <div className="flex-col px-8 py-4 border-b border-b-1 border-b-gray-300">
        <div className='flex'>
          <div className="mr-12 text-xl">&ldquo;{message}&rdquo;</div>
          <ContentExternalLinkIcon />
        </div>
        <div className='text-sm text-primary-gray-300' style={{ lineHeight: '48px' }}>{source} on <span className='text-primary-purple'>Discord</span></div>
      </div>
      <div className='px-6 py-3 uppercase text-light text-primary-gray-300'>
        {formatDistance(timestamp, new Date())} ago
      </div>
    </div>
  );
}

export default NetworkDiscordCard;
