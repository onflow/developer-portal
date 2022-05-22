import clsx from 'clsx';
import React from 'react';
import RightChevronIcon from '../icons/RightChevronIcon';

export type NetworkCardProps = {
  networkName: string;
  status: 'Under Maintenance' | 'Healthy';
  version: string;
  lastSporkDate: string;
  nextSporkDate: string;
  link: string;
}

const NetworkCard = ({ networkName, status, version, lastSporkDate, nextSporkDate, link }: NetworkCardProps) => {
  const statusClasses = clsx('rounded-full w-11 h-11 md:mb-0 sm:mb-4', {
    'bg-primary-red': status === 'Under Maintenance',
    'bg-primary-green': status === 'Healthy'
  });

  return (
    <a href={link} className="flex items-center justify-around p-4 bg-white rounded-2xl md:flex-row hover:shadow-2xl dark:bg-gray-800 sm:flex-col sm:text-center">
      <div className={statusClasses} />
      <span className='text-xl font-bold md:mb-0 sm:mb-4'>{networkName}</span>
      <div className='md:mb-0 sm:mb-4'>
        <p className="mb-2 text-sm uppercase text-primary-gray-200" style={{ minWidth: '148px' }}>Status</p>{status}
      </div>
      <div className='md:mb-0 sm:mb-4'>
        <p className="mb-2 text-sm uppercase text-primary-gray-200">Version</p>{version}
      </div>
      <div className='md:mb-0 sm:mb-4'>
        <p className="mb-2 text-sm uppercase text-primary-gray-200">Last Spork Date</p>{lastSporkDate}
      </div>
      <div className='md:mb-0 sm:mb-4'>
        <p className="mb-2 text-sm uppercase text-primary-gray-200">Next Spork Date</p>{nextSporkDate}
      </div>
      <div className="md:inline-block sm:hidden"><RightChevronIcon /></div>
    </a>
  );
}

export default NetworkCard;
