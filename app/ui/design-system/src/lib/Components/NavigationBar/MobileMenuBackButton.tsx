import { ReactComponent as ArrowLeftIcon } from "../../../../images/arrows/nav-left"
import { MobileMenuButton, MobileMenuButtonProps } from "./MobileMenuButton"

export type MobileMenuBackButtonProps = MobileMenuButtonProps

export function MobileMenuBackButton({
  children = "Back",
  className,
  ...props
}: MobileMenuBackButtonProps) {
  return (
    <MobileMenuButton className="hover:opacity-75" {...props}>
      <span className="-ml-2 scale-50">
        <ArrowLeftIcon />
      </span>{" "}
      {children}
    </MobileMenuButton>
  )
}
