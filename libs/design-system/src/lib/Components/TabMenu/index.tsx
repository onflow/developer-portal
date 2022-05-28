import clsx from 'clsx';
import React, { useState } from 'react';

export type TabMenuProps = {
  tabs: string[];
  onTabChange: Function;
};

const TabMenu = ({ tabs, onTabChange }: TabMenuProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex justify-start overflow-x-scroll border-b-2 border-primary-gray-200 dark:border-primary-gray-100 md:justify-center">
      {tabs.map((tab, index) => {
        const isCurrentIndex = activeIndex === index;
        const classes = clsx('hover:cursor-pointer', {
          'font-bold': isCurrentIndex,
        });
        const indicatorClasses = clsx(
          'bg-black rounded-tr-lg rounded-tl-lg h-2 mt-8 dark:bg-white',
          { block: isCurrentIndex, hidden: !isCurrentIndex }
        );

        return (
          <div key={tab} className="min-w-[6rem] text-center md:min-w-[10rem]">
            <span
              className={classes}
              onClick={() => {
                setActiveIndex(index);
                onTabChange(index);
              }}
            >
              {tab}
            </span>
            <div className={indicatorClasses} />
          </div>
        );
      })}
    </div>
  );
};

export default TabMenu;
