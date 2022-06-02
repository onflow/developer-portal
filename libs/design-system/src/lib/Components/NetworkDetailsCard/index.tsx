import React from 'react';
import { ReactComponent as ChevronRightIcon } from '../../../../images/arrows/chevron-right.svg';
import { ReactComponent as RssIcon } from '../../../../images/content/rss.svg';
import { Link } from '../Link';

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
      className="mx-auto flex flex-col items-center justify-center rounded-2xl bg-white py-4 text-center dark:bg-primary-gray-dark md:flex-row md:py-0"
      style={{ maxWidth: '1140px' }}
    >
      <div className="border-0 border-accent-light-gray px-8 py-4 md:border-r-2">
        <p className="mb-2 text-xs uppercase text-primary-gray-200">Version</p>
        {version}
      </div>

      <div className="border-0 border-accent-light-gray px-8 py-4 md:border-r-2 ">
        <p
          className="mb-2 text-xs uppercase text-primary-gray-200"
          style={{ minWidth: '148px' }}
        >
          Status
        </p>
        {/* @ts-ignore */}
        <Link href={statusLink}>{status}</Link>
      </div>

      <div className="border-0 border-accent-light-gray px-8 py-4 md:border-r-2">
        <p className="mb-2 text-xs uppercase text-primary-gray-200">
          Last Spork Date
        </p>
        {lastSporkDate}
      </div>

      <div className="border-0 border-accent-light-gray px-8 py-4 md:border-r-2">
        <p className="mb-2 text-xs uppercase text-primary-gray-200">
          Next Spork Date
        </p>
        {nextSporkDate}
      </div>

      <div className="px-8 py-4">
        <p className="mb-2 text-xs uppercase text-primary-gray-200 dark:text-blue-dark">
          RSS Feed
        </p>
        {/* @ts-ignore */}
        <Link href={rssFeed} className="flex items-center text-sm">
          <RssIcon />
          <span className="mx-2 mt-1">RSS Feed</span>
          <ChevronRightIcon />
        </Link>
      </div>
    </div>
  );
};

export default NetworkDetailsCard;
