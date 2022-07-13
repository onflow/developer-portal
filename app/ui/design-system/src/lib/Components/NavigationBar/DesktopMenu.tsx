import { DesktopMenuItem } from "./DesktopMenuItem"
import { MenuItem } from "./types"

export type DesktopMenuProps = {
  menuItems: MenuItem[]
}

export function DesktopMenu({ menuItems }: DesktopMenuProps) {
  return (
    <ul className="main-nav-desktop-menu hidden items-center">
      {menuItems.map(({ divider, ...menuItem }, index) => (
        <DesktopMenuItem key={index} divider={divider === true} {...menuItem} />
      ))}
    </ul>
  )
}
