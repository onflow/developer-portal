import { ReactComponent as ChevronRight } from '../../../../images/arrows/chevron-right';
import Tag from '../Tag';

export type InternalLandingHeaderCardProps = {
  title: string;
  tags: string[];
  description: string;
  href: string;
};

export function InternalLandingHeaderCard({
  title,
  tags,
  description,
  href,
}: InternalLandingHeaderCardProps) {
  return (
    <a
      className="group flex min-h-[9rem] flex-1 flex-row rounded-2xl bg-white px-6 py-5 dark:bg-black"
      href={href}
    >
      <div className="pr-2">
        <div className="flex flex-col md:flex-col-reverse">
          <div className="mb-2 md:mb-0">
            {tags.map((tag) => (
              <Tag name={tag} />
            ))}
          </div>
          <div className="text-xl text-black text-semibold group-hover:opacity-75 dark:text-white">
            {title}
          </div>
        </div>
        <div className="mt-2 text-sm text-primary-gray-300 dark:text-primary-gray-200">
          {description}
        </div>
      </div>
      <div className="ml-auto text-black mt-7 group-hover:opacity-75 dark:text-white">
        <ChevronRight />
      </div>
    </a>
  );
}
