import clsx from "clsx"

export type MobileMenuButtonProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "type"
>

export function MobileMenuButton({
  children,
  className,
  ...props
}: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      className={clsx(className, "flex px-4 py-2 hover:opacity-75")}
      {...props}
    >
      {children}
    </button>
  )
}
