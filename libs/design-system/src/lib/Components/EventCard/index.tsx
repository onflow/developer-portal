import { ButtonLink } from '../Button';
import Tag from '../Tag';

export type EventCardProps = {
  buttonText: string;
  buttonUrl: string;
  description: string;
  eventType: string;
  imageAlt?: string;
  imageSrc: string;
  tags?: string[];
  title: string;
  eventDate: string;
};

export function EventCard({
  buttonText,
  buttonUrl,
  description,
  imageAlt = '',
  imageSrc,
  eventType = 'Online',
  tags,
  title,
  eventDate,
}: EventCardProps) {
  return (
    <div className="flex min-h-fit flex-col-reverse overflow-hidden rounded-2xl bg-white dark:bg-primary-dark-gray md:min-h-[30rem] md:flex-row">
      <div className="min-w-[50%] flex-1 basis-1/2 self-center py-10 pl-6 pr-6 md:pr-32 md:pl-20">
        <div className="divide-x divide-solid divide-primary-gray-200 text-primary-gray-300">
          <span className="pr-2">{eventDate}</span>
          <span className="pl-2">{eventType}</span>
        </div>
        <h3 className="text-h3 mb-2 md:mb-3">{title}</h3>
        {tags && tags.length > 0 && (
          <div>
            {tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
        )}
        <p className="mt-3 pb-6 dark:text-primary-gray-100">{description}</p>
        <ButtonLink
          href={buttonUrl}
          variant="primary-inverse"
          className="whitespace-nowrap px-16 py-4 text-center"
        >
          {buttonText}
        </ButtonLink>
      </div>
      <div className="flex-1 basis-1/2 self-stretch">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
