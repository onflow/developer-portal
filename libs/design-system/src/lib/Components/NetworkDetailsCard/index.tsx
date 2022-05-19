import React from 'react';
import { Link } from '../Link';
import { RightChevronIcon, RssFeedIcon } from '../icons';

export type NetworkDetailsCardProps = {
  status: 'Under Maintenance' | 'Healthy';
  statusLink: string;
  version: string;
  lastSporkDate: string;
  nextSporkDate: string;
  rssFeed: string;
}

const NetworkDetailsCard = ({ status, statusLink, version, lastSporkDate, nextSporkDate, rssFeed }: NetworkDetailsCardProps) => {
  return (
    <div className="bg-white rounded-2xl flex items-center dark:bg-gray-800 text-center" style={{ width: 'fit-content' }}>

      <div className="border-r-2 border-accent-light-gray py-4 px-8">
        <p className="text-primary-gray-200 uppercase text-sm mb-2">Version</p>{version}
      </div>

      <div className="border-r-2 border-accent-light-gray py-4 px-8">
        <p className="text-primary-gray-200 uppercase text-sm mb-2" style={{ minWidth: '148px' }}>Status</p>
        {/* @ts-ignore */}
        <Link href={statusLink}>{status}</Link>
      </div>

      <div className="border-r-2 border-accent-light-gray py-4 px-8">
        <p className="text-primary-gray-200 uppercase text-sm mb-2">Last Spork Date</p>{lastSporkDate}
      </div>

      <div className="border-r-2 border-accent-light-gray py-4 px-8">
        <p className="text-primary-gray-200 uppercase text-sm mb-2">Next Spork Date</p>{nextSporkDate}
      </div>

      <div className="py-4 px-8">
        <p className="text-primary-gray-200 uppercase text-sm mb-2">RSS Feed</p>
        {/* @ts-ignore */}
        <Link href={rssFeed} className="flex items-center text-sm text-brand-purple dark:text-primary-gray-50">
          <div className="w-4"><RssFeedIcon /></div>&nbsp;RSS Feed&nbsp;<RightChevronIcon />
        </Link>
      </div>

    </div>
  )
}

export default NetworkDetailsCard;
