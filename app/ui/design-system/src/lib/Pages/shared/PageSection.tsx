import clsx from "clsx"

export default function PageSection({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={clsx("py-16", className)}>{children}</div>
}
