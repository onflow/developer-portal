import { Transition } from "@headlessui/react"
import clsx from "clsx"
import { Fragment } from "react"
import { ReactComponent as CloseIcon } from "../../../../images/action/close"
import { ReactComponent as MenuIcon } from "../../../../images/action/menu"

export type MobileMenuToggleButtonProps = {
  isOpen: boolean
  onOpenChanged: (open: boolean) => void
  height?: string
  width?: string
  className?: string
}

export function MobileMenuToggleButton({
  className,
  height = "26px",
  width = height,
  isOpen,
  onOpenChanged,
}: MobileMenuToggleButtonProps) {
  return (
    <button
      className={clsx("relative", className)}
      onClick={() => onOpenChanged(!isOpen)}
      type="button"
      style={{ height, width }}
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
          <CloseIcon height={height} width={width} />
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
          <MenuIcon height={height} width={width} />
        </div>
      </Transition>
    </button>
  )
}
