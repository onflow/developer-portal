import { ReactComponent as ArrowLeftIcon } from "../../../../images/arrows/nav-left"
import { MobileMenuButton, MobileMenuButtonProps } from "./MobileMenuButton"

export type MobileMenuBackButtonProps = MobileMenuButtonProps

export function MobileMenuBackButton({
  children = "Back",
  className,
  ...props
}: MobileMenuBackButtonProps) {
  return (
    <MobileMenuButton {...props}>
      <ArrowLeftIcon /> {children}
    </MobileMenuButton>
  )
}
