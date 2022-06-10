 
import { ReactComponent as CalendarIcon } from '../../../../images/action/date-calendar';
import { ReactComponent as CommentIcon } from '../../../../images/arrows/message-circle';
import Tag from '../Tag';
import RoundImage from '../RoundImage';

export type User = {
  profileImage: string;
  name: string;
};

export type FlipCellProps = {
  numComments: number;
  heading: string;
  tags: string[];
  participant: User;
  date: string;
  forumLink: string;
};

const FlipCell = ({
  heading,
  tags,
  participant,
  numComments,
  date,
  forumLink,
}: FlipCellProps) => {
  return (
    <a
      href={forumLink}
      className="flex flex-col items-center justify-between rounded-lg bg-white p-6 hover:cursor-pointer hover:shadow-2xl dark:bg-primary-gray-dark md:flex-row md:p-8"
    >
      <div className="flex items-center">
        <svg
          className="hidden md:inline-flex"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="18" cy="18" r="17.5" stroke="#47FFB2" />
          <circle cx="18" cy="18" r="5.5" fill="#47FFB2" stroke="#47FFB2" />
        </svg>
        <div className="ml-0 md:ml-4">
          <p className="mb-1 text-lg font-semibold md:text-xl">{heading}</p>
          <span className="text-primary-gray-300">
            {tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </span>
        </div>
      </div>
      <div className="mt-12 flex items-center md:mt-0">
        <div className="w-28">
          <RoundImage
            imageUri={participant.profileImage}
            altText={participant.name}
          />
        </div>
        <div className="space-between flex text-primary-gray-300">
          <CalendarIcon /> {date}
        </div>
        <div className="ml-3 flex text-primary-gray-300">
          <CommentIcon /> <span className="ml-3">{numComments}</span>
        </div>
      </div>
    </a>
  );
};

export default FlipCell;
