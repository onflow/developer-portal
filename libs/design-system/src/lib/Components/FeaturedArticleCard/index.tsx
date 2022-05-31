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
    <div className="rounded-lg bg-white py-[122px] px-[80px] dark:bg-primary-gray-dark">
      {tags.map((tag) => (
        <Tag name={tag} />
      ))}
      <div>{heading}</div>
      <div>{description}</div>
      <ButtonLink href={link}>{ctaText}</ButtonLink>
    </div>
  );
};

export default FeaturedArticleCard;
