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
        "flex items-center border-b py-1 text-sm uppercase text-primary-gray-300 dark:text-primary-gray-100 md:px-2",
        className
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}{" "}
      <span className="truncate">{title}</span>
    </h6>
  )
}
