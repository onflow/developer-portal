import React from 'react';
import { Link } from '../Link';
import { ReactComponent as ChevronRightIcon } from '../../../../images/arrows/chevron-right.svg';
import { ReactComponent as RssIcon } from '../../../../images/content/rss.svg';

export type NetworkDetailsCardProps = {
  status: 'Under Maintenance' | 'Healthy';
  statusLink: string;
  version: string;
  lastSporkDate: string;
  nextSporkDate: string;
  rssFeed: string;
};

const NetworkDetailsCard = ({
  status,
  statusLink,
  version,
  lastSporkDate,
  nextSporkDate,
  rssFeed,
}: NetworkDetailsCardProps) => {
  return (
    <div
      className="flex items-center justify-center mx-auto text-center bg-white rounded-2xl dark:bg-primary-dark-gray xs:flex-col xs:py-4 md:flex-row md:py-0"
      style={{ maxWidth: '1140px' }}
    >
      <div className="px-8 py-4 border-accent-light-gray xs:border-0 md:border-r-2">
        <p className="mb-2 text-xs uppercase text-primary-gray-200">Version</p>
        {version}
      </div>

      <div className="px-8 py-4 border-accent-light-gray xs:border-0 md:border-r-2 ">
        <p
          className="mb-2 text-xs uppercase text-primary-gray-200"
          style={{ minWidth: '148px' }}
        >
          Status
        </p>
        {/* @ts-ignore */}
        <Link href={statusLink} className=" hover:cursor-pointer">
          {status}
        </Link>
      </div>

      <div className="px-8 py-4 border-accent-light-gray xs:border-0 md:border-r-2">
        <p className="mb-2 text-xs uppercase text-primary-gray-200">
          Last Spork Date
        </p>
        {lastSporkDate}
      </div>

      <div className="px-8 py-4 border-accent-light-gray xs:border-0 md:border-r-2">
        <p className="mb-2 text-xs uppercase text-primary-gray-200">
          Next Spork Date
        </p>
        {nextSporkDate}
      </div>

      <div className="px-8 py-4">
        <p className="mb-2 text-xs uppercase dark:text-primary-blue-dark text-primary-gray-200">
          RSS Feed
        </p>
        {/* @ts-ignore */}
        <Link
          href={rssFeed}
          className="flex items-center text-sm hover:cursor-pointer"
        >
          <RssIcon />
          <span className="mx-2 mt-1">RSS Feed</span>
          <ChevronRightIcon />
        </Link>
      </div>
    </div>
  );
};

export default NetworkDetailsCard;
