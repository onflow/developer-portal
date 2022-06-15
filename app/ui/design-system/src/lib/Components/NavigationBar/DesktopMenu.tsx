import { DesktopMenuItem } from "./DesktopMenuItem"
import { MenuItem } from "./types"

export type DesktopMenuProps = {
  menuItems: MenuItem[]
}

export function DesktopMenu({ menuItems }: DesktopMenuProps) {
  return (
    <ul className="hidden items-center md:flex">
      {menuItems.map(({ divider, ...menuItem }, index) => (
        <DesktopMenuItem
          key={index}
          divider={index === 0 || divider === true}
          {...menuItem}
        />
      ))}
    </ul>
  )
}
