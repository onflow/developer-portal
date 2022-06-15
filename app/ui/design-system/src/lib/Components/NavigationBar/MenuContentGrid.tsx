import clsx from "clsx"

export type MenuContentGridProps = React.PropsWithChildren<{
  className?: string
  isTabContent: boolean
  hasCards: boolean
}>

export function MenuContentGrid({
  children,
  className,
  hasCards,
  isTabContent,
}: MenuContentGridProps) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1  overflow-y-auto",
        {
          "md:grid-cols-1 lg:grid-cols-2": hasCards && isTabContent,
          "md:grid-cols-2 lg:grid-cols-3":
            (hasCards || isTabContent) && !(hasCards && isTabContent),
          "md:grid-cols-4 lg:grid-cols-4 ": !hasCards && !isTabContent,
        },
        className
      )}
    >
      {children}
    </div>
  )
}
