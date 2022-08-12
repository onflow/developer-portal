import clsx from "clsx"
import { ReactComponent as ArrowLeftIcon } from "../../../../images/arrows/nav-left"
import { MobileMenuButton, MobileMenuButtonProps } from "./MobileMenuButton"

export type MobileMenuBackButtonProps = MobileMenuButtonProps

export function MobileMenuBackButton({
  children = "Back",
  className,
  ...props
}: MobileMenuBackButtonProps) {
  const classes = clsx(
    "hover:opacity-75 text-xl text-primary-gray-300 dark:text-primary-gray-200",
    className
  )
  return (
    <MobileMenuButton className={classes} {...props}>
      <span className="-ml-2 mr-2 scale-75">
        <ArrowLeftIcon />
      </span>{" "}
      {children}
    </MobileMenuButton>
  )
}
