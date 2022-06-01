import clsx from 'clsx';
import React, { useCallback, useRef, useState } from 'react';

export type MobileCarouselProps = React.PropsWithChildren<unknown>;

/**
 * A Carousel that allows scrolling through it's children horizontally and
 * individually, but in larger screens (md+) shows all children stacked
 * vertically.
 */
export function MobileCarousel({ children }: MobileCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollContainer = useRef<HTMLUListElement>();
  const childCount = React.Children.count(children);

  const onScrollHandler = useCallback<React.UIEventHandler<HTMLUListElement>>(
    (e) => {
      const { scrollWidth, scrollLeft } = e.currentTarget;
      const index = Math.round((scrollLeft / scrollWidth) * childCount);
      setSelectedIndex(index);
    },
    [childCount]
  );

  return (
    <section className="flex flex-col">
      <ul
        className="flex min-h-fit snap-x snap-mandatory list-none flex-row gap-6 overflow-x-auto md:flex-col"
        onScroll={onScrollHandler}
        ref={scrollContainer}
      >
        {React.Children.map(children, (child, index) => (
          <li
            key={index}
            className={clsx('flex-none snap-start md:w-full', {
              'w-10/12': childCount > 1,
              'w-full': childCount <= 1,
            })}
          >
            {child}
          </li>
        ))}
      </ul>
      <ul
        className={clsx(
          'flex list-none flex-row justify-center pt-3 md:hidden',
          {
            hidden: childCount <= 1,
          }
        )}
        role="listbox"
      >
        {React.Children.map(children, (_, index) => (
          <button
            key={index}
            type="button"
            role="option"
            aria-selected={index === selectedIndex ? 'true' : 'false'}
            className={clsx(
              'mr-3 h-3 h-4 w-3 w-4 rounded-full hover:cursor-pointer',
              {
                'bg-green-success': index === selectedIndex,
                'bg-primary-gray-100': index !== selectedIndex,
              }
            )}
            onClick={(e) => {
              const { current } = scrollContainer;

              current?.scrollTo({
                left: current?.scrollWidth * (index / childCount),
                behavior: 'smooth',
              });
            }}
          />
        ))}
      </ul>
    </section>
  );
}
