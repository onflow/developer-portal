import React from "react"
import { ReactComponent as ChevronRight } from '../../../../images/arrows/chevron-right.svg';
import { ReactComponent as ExternalLinkIcon } from '../../../../images/content/external-link.svg';
import { ButtonLink } from '../Button';
import { isLinkExternal } from '../Link/isLinkExternal';

export type FeatureLinkBlockProps = {
  ctaLink: string;
  ctaText: string;
  description: string;
  icon: React.ReactNode;
  links: Array<{
    href: string;
    title: string;
  }>;
  title: string;
};

export function FeatureLinkBlock({
  ctaLink = 'Online',
  ctaText,
  description,
  icon,
  links,
  title,
}: FeatureLinkBlockProps) {
  return (
    <div className="flex flex-col items-start items-stretch rounded-lg bg-white p-6 dark:bg-primary-gray-dark md:flex-row md:items-center md:p-12">
      <div className="basis-1/2 md:mr-10">
        {icon}
        <h2 className="text-h2 mb-2 mt-6">{title}</h2>
        <p className="mb-10 text-primary-gray-400 dark:text-primary-gray-100">
          {description}
        </p>
        <ButtonLink
          href={ctaLink}
          className="whitespace-nowrap px-8 py-3 text-center"
        >
          {ctaText}
        </ButtonLink>
      </div>
      <div className="mt-10 flex basis-1/2 flex-col items-stretch divide-y divide-primary-gray-100 dark:divide-primary-gray-400">
        {links.map(({ title, href }) => (
          <a
            className="flex items-center justify-between py-3 text-sm text-primary-blue hover:opacity-75 dark:text-blue-dark"
            key={title}
            href={href}
          >
            <span>{title}</span>
            {isLinkExternal(href) ? <ExternalLinkIcon /> : <ChevronRight />}
          </a>
        ))}
      </div>
    </div>
  );
}
