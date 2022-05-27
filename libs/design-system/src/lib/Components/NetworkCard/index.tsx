import clsx from 'clsx';
import React from 'react';
import { ReactComponent as ChevronRightIcon } from '../../../../images/arrows/chevron-right.svg';

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
    'bg-green-success': status === 'Healthy',
  });

  return (
    <a
      href={link}
      className="flex items-center justify-around px-4 py-6 bg-white rounded-2xl hover:shadow-2xl dark:bg-primary-dark-gray xs:flex-col xs:text-center md:flex-row md:text-left"
    >
      <div className="flex items-center xs:flex-col md:flex-row">
        <div className={statusClasses} />
        <span className="text-xl font-bold xs:ml-0 xs:mb-6 md:ml-6 md:mb-0">
          {networkName}
        </span>
      </div>

      <div className="xs:mb-4 md:mb-0">
        <p className="mb-2 text-xs uppercase text-primary-gray-200">Status</p>
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
        <ChevronRightIcon />
      </div>
    </a>
  );
};

export default NetworkCard;
