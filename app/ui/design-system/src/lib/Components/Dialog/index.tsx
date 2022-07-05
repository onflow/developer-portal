import { Dialog as HeadlessDialog } from "@headlessui/react"
import React from "react"

export function Dialog({
  open,
  closeDialog,
  maxWidth,
  children,
}: {
  open: boolean
  closeDialog: () => void
  maxWidth?: string
  children: React.ReactNode
}) {
  return (
    <HeadlessDialog open={open} onClose={closeDialog}>
      <HeadlessDialog.Panel
        className={
          "fixed inset-0 z-50 mx-auto flex items-center justify-center"
        }
      >
        <button
          className="fixed inset-0 bg-black/30"
          aria-hidden="true"
          onClick={closeDialog}
        />
        <div
          className="z-30 flex h-full w-full flex-col dark:shadow-2xl-dark"
          style={{
            margin: "10vh 10vw",
            height: "80vh",
            maxWidth: maxWidth || "80vw",
          }}
        >
          {children}
        </div>
      </HeadlessDialog.Panel>
    </HeadlessDialog>
  )
}
