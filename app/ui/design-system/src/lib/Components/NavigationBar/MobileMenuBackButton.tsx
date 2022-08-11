import clsx from "clsx"
import { ReactComponent as ArrowLeftIcon } from "../../../../images/arrows/nav-left"
import { MobileMenuButton, MobileMenuButtonProps } from "./MobileMenuButton"

export type MobileMenuBackButtonProps = MobileMenuButtonProps

export function MobileMenuBackButton({
  children = "Back",
  className,
  ...props
}: MobileMenuBackButtonProps) {
  const classes = clsx("hover:opacity-75", className)
  return (
    <MobileMenuButton className={classes} {...props}>
      <span className="-ml-2 scale-50">
        <ArrowLeftIcon />
      </span>{" "}
      {children}
    </MobileMenuButton>
  )
}
