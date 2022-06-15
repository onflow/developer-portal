import clsx from "clsx"

export type TabHeadingProps = {
  className?: string
  description: string
  isSelected?: boolean
  title: string
}

export function TabHeading({
  className,
  description,
  isSelected = false,
  title,
}: TabHeadingProps) {
  return (
    <span className={clsx("flex flex-col overflow-hidden", className)}>
      <h6
        className={clsx("text-h6 truncate", {
          "text-black dark:text-white": isSelected,
          "text-primary-gray-300 dark:text-primary-gray-100": !isSelected,
        })}
      >
        {title}
      </h6>
      <p
        className={clsx("overflow-hidden text-ellipsis leading-none", {
          "text-primary-gray-400 dark:text-primary-gray-200": isSelected,
          "text-black/20 dark:text-primary-gray-300": !isSelected,
        })}
      >
        {description}
      </p>
    </span>
  )
}
