import clsx from 'clsx';
import React from 'react';
import RightChevronIcon from '../Icons/RightChevronIcon';

export type NetworkCardProps = {
  networkName: string;
  status: 'Under Maintenance' | 'Healthy';
  version: string;
  lastSporkDate: string;
  nextSporkDate: string;
  link: string;
};

const NetworkCard = ({
  networkName,
  status,
  version,
  lastSporkDate,
  nextSporkDate,
  link,
}: NetworkCardProps) => {
  const statusClasses = clsx('rounded-full w-11 h-11 md:mb-0 xs:mb-4', {
    'bg-primary-red': status === 'Under Maintenance',
    'bg-primary-green': status === 'Healthy',
  });

  return (
    <a
      href={link}
      className="flex items-center justify-around px-4 py-6 bg-white rounded-2xl hover:shadow-2xl dark:bg-primary-dark-gray xs:flex-col xs:text-center md:flex-row"
    >
      <div className={statusClasses} />
      <span className="text-xl font-bold xs:mb-4 md:mb-0">{networkName}</span>
      <div className="xs:mb-4 md:mb-0">
        <p
          className="mb-2 text-xs uppercase text-primary-gray-200"
          style={{ minWidth: '148px' }}
        >
          Status
        </p>
        {status}
      </div>
      <div className="xs:mb-4 md:mb-0">
        <p className="mb-2 text-xs uppercase text-primary-gray-200">Version</p>
        {version}
      </div>
      <div className="xs:mb-4 md:mb-0">
        <p className="mb-2 text-xs uppercase text-primary-gray-200">
          Last Spork Date
        </p>
        {lastSporkDate}
      </div>
      <div className="xs:mb-4 md:mb-0">
        <p className="mb-2 text-xs uppercase text-primary-gray-200">
          Next Spork Date
        </p>
        {nextSporkDate}
      </div>
      <div className="xs:hidden md:inline-block">
        <RightChevronIcon />
      </div>
    </a>
  );
};

export default NetworkCard;
