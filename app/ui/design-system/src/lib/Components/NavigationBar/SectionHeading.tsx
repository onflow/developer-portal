import clsx from "clsx"

export type SectionHeadingProps = {
  className?: string
  icon?: React.ReactNode
  title: string
}

export function SectionHeading({
  className,
  icon,
  title,
}: SectionHeadingProps) {
  return (
    <h6
      className={clsx(
        "mb-5 flex items-center border-b border-primary-gray-100 py-2 text-sm uppercase text-primary-gray-300 dark:border-primary-gray-400 dark:text-primary-gray-200 md:px-2",
        className
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}{" "}
      <span className="truncate">{title}</span>
    </h6>
  )
}
