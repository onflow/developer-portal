import clsx from 'clsx';
import React, { useState } from 'react';

export type TabMenuProps = {
  tabs: string[];
  onTabChange: Function;
};

const TabMenu = ({ tabs, onTabChange }: TabMenuProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex justify-start overflow-x-scroll border-b border-primary-gray-200 dark:border-primary-gray-100 md:justify-center">
      {tabs.map((tab, index) => {
        const isCurrentIndex = activeIndex === index;
        const classes = clsx(
          'hover:cursor-pointer text-primary-gray-300 dark:text-primary-gray-200',
          {
            'font-bold text-black dark:text-white': isCurrentIndex,
          }
        );
        const indicatorClasses = clsx(
          'bg-black rounded-tr-lg rounded-tl-lg h-2 mt-4 dark:bg-white',
          { block: isCurrentIndex, hidden: !isCurrentIndex }
        );

        return (
          <div
            key={tab}
            className="min-w-[6rem] text-center md:min-w-[10rem]"
            onClick={() => {
              setActiveIndex(index);
              onTabChange(index);
            }}
          >
            <span className={classes}>{tab}</span>
            <div className={indicatorClasses} />
          </div>
        );
      })}
    </div>
  );
};

export default TabMenu;
