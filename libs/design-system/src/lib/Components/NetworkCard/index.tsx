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
  const statusClasses = clsx('rounded-full w-11 h-11 sm:mb-4', {
    'bg-primary-red': status === 'Under Maintenance',
    'bg-primary-green': status === 'Healthy'
  })

  return (
    <div className="bg-white rounded-2xl md:flex-row flex items-center justify-around py-4 px-12 dark:bg-gray-800 sm:flex-col sm:text-center">
      <div className={statusClasses} />
      <span className='text-2xl font-bold sm:mb-4'>{networkName}</span>
      <div className='sm:mb-4'>
        <p className="text-primary-gray-200 uppercase text-sm mb-2" style={{ minWidth: '148px' }}>Status</p>{status}
      </div>
      <div className='sm:mb-4'>
        <p className="text-primary-gray-200 uppercase text-sm mb-2">Version</p>{version}
      </div>
      <div className='sm:mb-4'>
        <p className="text-primary-gray-200 uppercase text-sm mb-2">Last Spork Date</p>{lastSporkDate}
      </div>
      <div className='sm:mb-4'>
        <p className="text-primary-gray-200 uppercase text-sm mb-2">Next Spork Date</p>{nextSporkDate}
      </div>
      <a href={link} className="md:inline-block sm:hidden"><RightChevronIcon /></a>
    </div>
  )
}

export default NetworkCard;
