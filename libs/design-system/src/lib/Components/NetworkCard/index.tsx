import clsx from 'clsx';
import React from 'react';
import { Heading } from '../Heading/Heading';
import ChevronIcon from '../icons/ChevronIcon';

export type NetworkCardProps = {
  networkName: string;
  status: 'Under Maintenance' | 'Healthy';
  version: string;
  lastSporkDate: string;
  nextSporkDate: string;
  link: string;
}

const NetworkCard = ({ networkName, status, version, lastSporkDate, nextSporkDate, link }: NetworkCardProps) => {
  const statusClasses = clsx('rounded-full w-11 h-11', {
    'bg-red': status === 'Under Maintenance',
    'bg-green': status === 'Healthy'
  })
  return (
    <div className="bg-white rounded-2xl flex items-center justify-around py-4 px-12">
      <div className={statusClasses} />
      <Heading type="h2">{networkName}</Heading>
      <div><p className="text-brand-gray-200 uppercase text-sm mb-2" style={{ minWidth: '148px' }}>Status</p>{status}</div>
      <div><p className="text-brand-gray-200 uppercase text-sm mb-2">Version</p>{version}</div>
      <div><p className="text-brand-gray-200 uppercase text-sm mb-2">Last Spork Date</p>{lastSporkDate}</div>
      <div><p className="text-brand-gray-200 uppercase text-sm mb-2">Next Spork Date</p>{nextSporkDate}</div>
      <a href={link}><ChevronIcon /></a>
    </div>
  )
}

export default NetworkCard;
