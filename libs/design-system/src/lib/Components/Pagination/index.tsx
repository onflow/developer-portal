import React from "react"
 
import { ReactComponent as ArrowLeftIcon } from '../../../../images/arrows/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from '../../../../images/arrows/arrow-right.svg';

export type PaginationProps = {
  page: number;
  itemCount: number;
  pageSize: number;
  setPage: (page: number) => null;
};

const Pagination = ({
  itemCount,
  pageSize,
  page,
  setPage,
}: PaginationProps) => {
  const pageCount = Math.ceil(itemCount / pageSize);

  return (
    <div className="flex items-center justify-end text-primary-gray-300">
      <div
        role="button"
        className="hover:cursor-pointer"
        onClick={() => setPage(page - 1)}
      >
        <ArrowLeftIcon />
      </div>
      <input
        type="text"
        className="w-10 ml-4 mr-2 text-center border rounded-sm border-primary-gray-300 dark:bg-black dark:text-white"
        value={page}
        onChange={(e) => {
          const {
            target: { value },
          } = e;
          setPage(+value);
        }}
      />
      of {pageCount}
      <div
        role="button"
        className="ml-4 hover:cursor-pointer"
        onClick={() => setPage(page + 1)}
      >
        <ArrowRightIcon />
      </div>
    </div>
  );
};

export default Pagination;
