import TutorialCard, { TutorialCardProps } from '.';
import Pagination from '../Pagination';
import { useEffect, useState } from 'react';

export type PaginatedTutorialCardListProps = {
  className?: string;

  /**
   * An optional identifier that, when changed, causes the pagination to
   * be reset to the first page.
   */
  listId?: unknown;

  pageSize?: number;

  tutorials: TutorialCardProps[];
};

export const PaginatedTutorialCardList = ({
  className,
  listId,
  pageSize = 4,
  tutorials,
}: PaginatedTutorialCardListProps) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    // If the listId changes we reset to the first page.
    // This allows the consuming component to force the page to reset
    // when the list of tutorials is changed in some significant way (i.e. the
    // list was filtered)
    setPage(1);
  }, [listId]);

  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {tutorials
          .slice((page - 1) * pageSize, page * pageSize)
          .map((tutorialProps, index) => (
            <TutorialCard key={index} className="w-full" {...tutorialProps} />
          ))}
      </div>
      <Pagination
        className="mt-4"
        itemCount={tutorials.length}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
      />
    </div>
  );
};

export default TutorialCard;
