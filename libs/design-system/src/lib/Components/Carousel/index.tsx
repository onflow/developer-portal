import clsx from 'clsx';
import React, { useCallback, useRef, useState } from 'react';

export type CarouselProps = React.PropsWithChildren<{
  /**
   * The breakpoint at which the view should switch to non-carousel mode.
   * If none, then carousel mode will always be used.
   */
  breakpoint?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * The width of each item within the carousel
   * (this could be anything, but they must be explicit so that tailwind's
   * PurgeCSS doesn't remove the class from the final CSS)
   */
  carouselItemWidth?:
    | 'w-6/12'
    | 'w-8/12'
    | 'w-9/12'
    | 'w-10/12'
    | 'w-11/12'
    | 'w-full'
    | string;
}>;

// w-10/12 w-9/12 w-8/12

/**
 * A Carousel that allows scrolling through it's children horizontally and
 * individually, but in larger screens (md+) shows all children stacked
 * vertically.
 */
export function Carousel({
  children,
  breakpoint = 'md',
  carouselItemWidth = 'w-10/12',
}: CarouselProps) {
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
        className={clsx(
          'flex min-h-fit snap-x snap-mandatory list-none flex-row gap-6 overflow-x-auto',
          {
            'sm:flex-col': breakpoint === 'sm',
            'md:flex-col': breakpoint === 'md',
            'lg:flex-col': breakpoint === 'lg',
            'xl:flex-col': breakpoint === 'xl',
          }
        )}
        onScroll={onScrollHandler}
        ref={scrollContainer}
      >
        {React.Children.map(children, (child, index) => (
          <li
            key={index}
            className={clsx('flex-none snap-start', {
              [carouselItemWidth]: childCount > 1,
              'w-full': childCount <= 1,
              'sm:w-full': breakpoint === 'sm',
              'md:w-full': breakpoint === 'md',
              'lg:w-full': breakpoint === 'lg',
              'xl:w-full': breakpoint === 'xl',
            })}
          >
            {child}
          </li>
        ))}
      </ul>
      <ul
        className={clsx('flex list-none flex-row justify-center pt-3', {
          hidden: childCount <= 1,
          'sm:hidden': breakpoint === 'sm',
          'md:hidden': breakpoint === 'md',
          'lg:hidden': breakpoint === 'lg',
          'xl:hidden': breakpoint === 'xl',
        })}
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
