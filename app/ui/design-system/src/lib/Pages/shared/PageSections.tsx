import clsx from "clsx"

export default function PageSections({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={clsx(
        "flex flex-col divide-y divide-primary-gray-100 dark:divide-primary-gray-400",
        className
      )}
    >
      {children}
    </div>
  )
}
