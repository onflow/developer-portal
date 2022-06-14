import { Transition } from "@headlessui/react"
import { Fragment } from "react"
import { ReactComponent as CloseIcon } from "../../../../images/action/close"
import { ReactComponent as MenuIcon } from "../../../../images/action/menu"

export type MobileMenuToggleButtonProps = {
  isOpen: boolean
  onOpenChanged: (open: boolean) => void
}

export function MobileMenuToggleButton({
  isOpen,
  onOpenChanged,
}: MobileMenuToggleButtonProps) {
  return (
    <button
      className="relative h-[26px] w-[26px]"
      onClick={() => onOpenChanged(!isOpen)}
      type="button"
    >
      <Transition
        as={Fragment}
        show={isOpen}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 rotate-[-120deg] scale-50"
        enterTo="opacity-100 rotate-0 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-95 "
      >
        <div className="absolute top-0 left-0 bottom-0 right-0">
          <CloseIcon height="26px" width="26px" />
        </div>
      </Transition>
      <Transition
        as={Fragment}
        show={!isOpen}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 rotate-[-120deg] scale-50"
        enterTo="opacity-100 rotate-0 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-95 "
      >
        <div className="absolute top-0 left-0 bottom-0 right-0">
          <MenuIcon height="26px" width="26px" />
        </div>
      </Transition>
    </button>
  )
}
