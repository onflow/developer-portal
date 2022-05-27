import clsx from 'clsx';
import React, { useState } from 'react';

export type TabMenuProps = {
  tabs: string[];
  onTabChange: Function;
};

const TabMenu = ({ tabs, onTabChange }: TabMenuProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex overflow-x-scroll border-b-2 border-primary-gray-200 dark:border-primary-gray-100 xs:justify-start md:justify-center">
      {tabs.map((tab, index) => {
        const isCurrentIndex = activeIndex === index;
        const classes = clsx('hover:cursor-pointer', {
          'font-bold': isCurrentIndex,
        });
        const indicatorClasses = clsx(
          'bg-black rounded-tr-lg rounded-tl-lg h-2 mt-4 dark:bg-white',
          { block: isCurrentIndex, hidden: !isCurrentIndex }
        );

        return (
          <div
            key={tab}
            className="text-center xs:min-w-[6rem] md:min-w-[8rem]"
          >
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
