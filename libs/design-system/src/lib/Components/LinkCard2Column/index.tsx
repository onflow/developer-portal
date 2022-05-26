import {
  LinkCard2ColumnLinkItem,
  LinkCard2ColumnLinkItemProps,
} from './LinkCard2ColumnLinkItem';
import { ButtonLink } from '../Button';
import Tag from '../Tag';

export type LinkCard2ColumnProps = {
  buttonText: string;
  buttonUrl: string;
  description: string;
  items: LinkCard2ColumnLinkItemProps[];
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
    <div className="container flex flex-col items-start rounded-lg bg-primary-gray-100/30 p-10 px-4 py-12 md:flex-row md:px-20 md:py-20">
      <div className="flex flex-1 flex-col items-start">
        <h2 className="text-h2 my-2 md:mb-3">{title}</h2>
        {tags && (
          <div className="mb-1">
            {tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
        )}
        <p>{description}</p>
        <ButtonLink href={buttonUrl} className="mb-10 mt-2 px-8 py-3 md:mt-10">
          {buttonText}
        </ButtonLink>
      </div>
      <div className="flex flex-1 flex-col items-stretch">
        {items.map((item) => (
          <LinkCard2ColumnLinkItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}
