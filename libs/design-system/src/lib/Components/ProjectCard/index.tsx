import React from 'react';
import { Tag } from '../';
import { ReactComponent as StarIcon } from '../../../../images/action/star.svg';
import { ReactComponent as ChevronRightIcon } from '../../../../images/arrows/chevron-right.svg';
import { ReactComponent as GithubIcon } from '../../../../images/social/github.svg';
import { ReactComponent as TwitterIcon } from '../../../../images/social/twitter.svg';
import { User } from '../../interfaces';

export type ProjectCardProps = {
  projectImage: string;
  heading: string;
  description: string;
  tags: string[];
  projectLink: string;
  author: User;
  numStars: number;
  twitterLink: string;
  githubLink: string;
};

const ProjectCard = ({
  projectImage,
  heading,
  description,
  tags,
  projectLink,
  author,
  numStars,
  twitterLink,
  githubLink,
}: ProjectCardProps) => {
  return (
    <div className="flex flex-col px-8 py-6 bg-white rounded-lg hover:shadow-2xl dark:bg-primary-gray-dark md:flex-row">
      <img
        src={projectImage}
        alt={heading}
        className="mb-4 h-[70px] w-[70px] rounded-xl object-cover md:mr-4"
      />
      <div className="flex-col">
        <div className="mb-2 text-2xl font-bold">{heading}</div>
        <div className="flex mb-2 text-primary-gray-300">
          {tags.map((tag) => (
            <Tag name={tag} />
          ))}
          <a href={twitterLink} className="mr-2">
            <TwitterIcon />
          </a>
          <a href={githubLink}>
            <GithubIcon />
          </a>
        </div>
        <div className="flex gap-2 mb-2">
          <img
            src={author.profileImage}
            className="object-cover w-6 h-6 rounded-full"
          />
          {author.name}
          <div className="flex">
            <div className="scale-75 text-secondary-yellow">
              <StarIcon />
            </div>
            {numStars}
          </div>
        </div>
        <div className="mb-6">{description}</div>
        <a
          className="flex justify-between font-bold text-primary-blue dark:text-blue-dark"
          href={projectLink}
        >
          This is a link
          <ChevronRightIcon />
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
