 

import { ReactComponent as StarIcon } from '../../../../images/action/star.svg';
import Tag from '../Tag';

export interface ToolCardProps {
  title: string;
  authorIcon: string;
  authorName: string;
  tags: string[];
  link: string;
  stars: number;
  toolIcon: string;
  description: string;
}

export function ToolCard({
  title,
  authorIcon,
  authorName,
  tags,
  link,
  stars,
  toolIcon,
  description,
}: ToolCardProps) {
  return (
    <a
      className="flex gap-4 px-8 py-6 bg-white rounded-lg dark:bg-primary-dark-gray"
      href={link}
    >
      <div>
        <div className="w-16 h-16 p-3 rounded-lg min-w-16 shadow-tool-card-icon backdrop-blur-2xl dark:bg-dark-tool-card-icon">
          <img src={toolIcon} />
        </div>
      </div>
      <div className="grow">
        <h5 className="text-h5">{title}</h5>
        <div className="flex items-center">
          <div className="flex items-center gap-2 pr-3 shrink-0 md:pr-4">
            <div>
              <img src={authorIcon} alt={authorName} width={24} height={24} />
            </div>
            <div className="text-sm text-gray-600 dark:gray-400 md:leading-1 whitespace-nowrap dark:text-gray-400">
              {authorName}
            </div>
          </div>

          <div className="pr-1 shrink-0 line-clamp-1">
            {tags.map((tag, i) => (
              <Tag name={tag} key={i} />
            ))}
          </div>

          <div className="flex gap-1 shrink-0">
            <StarIcon
              className="h-fit fill-amber-400 stroke-amber-400"
              width={14}
              height={14}
            />
            <div className="text-sm text-gray-500 md:leading-1 h-fit dark:text-gray-300">
              {stars}
            </div>
          </div>
        </div>
          <div className="pt-2 text-gray-700 line-clamp-2 dark:text-gray-300">
            {description}
          </div>

      </div>
    </a>
  );
}
