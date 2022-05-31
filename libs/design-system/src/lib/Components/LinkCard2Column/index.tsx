import {
  LinkCard2ColumnItem,
  LinkCard2ColumnItemProps,
} from './LinkCard2ColumnItem';
import { ButtonLink } from '../Button';
import Tag from '../Tag';

export type LinkCard2ColumnProps = {
  buttonText: string;
  buttonUrl: string;
  description: string;
  items: LinkCard2ColumnItemProps[];
  tags?: string[];
  title: string;
};

export function LinkCard2Column({
  buttonText,
  buttonUrl,
  description,
  items,
  tags,
  title,
}: LinkCard2ColumnProps) {
  return (
    <div className="container flex flex-col items-start rounded-lg bg-primary-gray-100/30 p-10 px-4 py-12 dark:bg-primary-dark-gray md:flex-row md:px-20 md:py-20">
      <div className="flex flex-1 flex-col items-start md:mr-20">
        <h2 className="text-h2 my-2 md:mb-3">{title}</h2>
        {tags && (
          <div className="mb-1">
            {tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
        )}
        <p className="max-w-[18rem] overflow-hidden text-ellipsis	text-primary-gray-400 dark:text-primary-gray-100 lg:max-w-[36rem] xl:max-w-[38rem]">
          {description}
        </p>
        <ButtonLink
          href={buttonUrl}
          className="mb-10 mt-2 px-8 py-3 md:mt-10"
          variant="primary-inverse"
        >
          {buttonText}
        </ButtonLink>
      </div>
      <div className="flex flex-1 flex-col items-stretch">
        {items.map((item) => (
          <LinkCard2ColumnItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}
