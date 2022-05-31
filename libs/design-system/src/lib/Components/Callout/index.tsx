import React from 'react';

export type CalloutProps = {
  heading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
};

const Callout = ({ heading, description, ctaText, ctaLink }: CalloutProps) => {
  return (
    <div
      className="flex rounded-2xl bg-white dark:bg-primary-gray-dark xs:flex-col-reverse md:flex-row"
      style={{ maxWidth: '1140px' }}
    >
      <div className="flex-1 xs:pl-6 xs:pr-6 xs:pt-10 xs:pb-16 md:pb-24 md:pl-16 md:pr-36 md:pt-36">
        <h3 className="text-h3">{heading}</h3>
        <p className="py-6 dark:text-primary-gray-100">{description}</p>
        <a
          className="mt-11 rounded-lg bg-black px-16 py-4 text-white hover:cursor-pointer"
          href={ctaLink}
        >
          {ctaText}
        </a>
      </div>
      <img
        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'"
        alt="Flowdocs node illustration"
        width="570"
      />
    </div>
  );
};

export default Callout;
