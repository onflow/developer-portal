import React from "react"
import { ReactComponent as KbdDown } from "../../../../images/misc/kbd-down"
import { ReactComponent as KbdEnter } from "../../../../images/misc/kbd-enter"
import { ReactComponent as KbdEsc } from "../../../../images/misc/kbd-esc"
import { ReactComponent as KbdUp } from "../../../../images/misc/kbd-up"
import KbdShortcut from "./KbdShortcut"

function ShortcutSection({
  text,
  children,
}: {
  text: string
  children: React.ReactNode
}) {
  return (
    <div className="my-1 mr-5 flex items-center">
      {children}
      <div className="ml-1">{text}</div>
    </div>
  )
}

export default function PanelShortcuts() {
  return (
    <div className="relative hidden flex-wrap items-center border-t border-t-primary-gray-200 px-5 py-2 text-primary-gray-200 dark:border-t-primary-gray-400 dark:text-primary-gray-300 md:flex">
      <ShortcutSection text="to select">
        <KbdShortcut>
          <KbdEnter />
        </KbdShortcut>
      </ShortcutSection>
      <ShortcutSection text="to navigate">
        <KbdShortcut>
          <KbdUp />
        </KbdShortcut>
        <KbdShortcut>
          <KbdDown />
        </KbdShortcut>
      </ShortcutSection>
      <ShortcutSection text="to close">
        <KbdShortcut>
          <KbdEsc />
        </KbdShortcut>
      </ShortcutSection>
    </div>
  )
}
