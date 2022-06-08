import React from "react"
import clsx from 'clsx';
import { ReactComponent as ExternalLinkIcon } from '../../../../images/content/external-link.svg';
import RadarImg from '../../../../images/misc/radar.png';
import RadarImg2x from '../../../../images/misc/radar@2x.png';
import RingsImg from '../../../../images/misc/rings.png';

export type InternalLandingCardProps = {
  title: string;
  description: string;
  isPrimary?: boolean;
  href: string;
};

export function InternalLandingCard({
  title,
  description,
  isPrimary,
  href,
}: InternalLandingCardProps) {
  return (
    <a
      className={clsx(
        'group flex max-w-[30rem] cursor-pointer items-center gap-4 rounded-2xl px-6 py-8 md:px-8',
        isPrimary
          ? 'internal-landing-card-green-bg text-black dark:text-white'
          : 'bg-primary-gray-400 text-white'
      )}
      href={href}
    >
      <div className="shrink-0">
        <div className="w-[54px] md:w-auto">
          {isPrimary ? (
            <img
              src={RadarImg}
              srcSet={`${RadarImg}, ${RadarImg2x} 2x`}
              alt="Radar"
              width="108"
              height="108"
            />
          ) : (
            <img
              src={RingsImg}
              srcSet={`${RingsImg}, ${RadarImg2x} 2x`}
              alt="Rings"
              width="108"
              height="108"
            />
          )}
        </div>
      </div>
      <div className="ml-1">
        <div className="text-lg font-semibold group-hover:opacity-75">
          {title}
        </div>
        <div
          className={clsx(
            'text-sm group-hover:opacity-75',
            isPrimary
              ? 'text-primary-gray-400 dark:text-primary-gray-50'
              : 'text-primary-gray-50'
          )}
        >
          {description}
        </div>
      </div>

      <div className="flex self-start h-full ml-auto group-hover:opacity-75">
        <ExternalLinkIcon />
      </div>
    </a>
  );
}
