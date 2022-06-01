import React from 'react';
import { ButtonLink } from '../Button';
import Tag from '../Tag';

export type FeaturedArticleCardProps = {
  heading: string;
  tags: string[];
  link: string;
  description: string;
  ctaText: string;
};

const FeaturedArticleCard: React.FC<FeaturedArticleCardProps> = ({
  heading,
  tags,
  link,
  description,
  ctaText,
}) => {
  return (
    <div className="rounded-lg bg-white px-8 py-12 dark:bg-primary-gray-dark md:py-[122px] md:px-[80px]">
      {tags.map((tag) => (
        <Tag name={tag} />
      ))}
      <div className="my-2 text-h2">{heading}</div>
      <p className="mb-14 text-primary-gray-300 dark:text-primary-gray-200">
        {description}
      </p>
      <ButtonLink href={link} className="px-6 py-4">
        {ctaText}
      </ButtonLink>
    </div>
  );
};

export default FeaturedArticleCard;
