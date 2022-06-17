import { Dialog } from "@headlessui/react"
import clsx from "clsx"
import React, { useState } from "react"
import { ReactComponent as CollapseIcon } from "../../../../images/content/collapse"
import { ReactComponent as FileCodeIcon } from "../../../../images/content/file-code"
// import { ReactComponent as FileCopyIcon } from "../../../../images/content/file-copy"
import { ReactComponent as HashIcon } from "../../../../images/content/hash"
import { ReactComponent as ScreenFullIcon } from "../../../../images/content/screen-full"
import { Code } from "./Code"

// TODO: Cadence and dark mode MDX code highlighting

export type InternalCodeblockProps = {
  tall?: boolean
  children: JSX.Element
}

function Header({
  showDialog,
  openDialog,
  closeDialog,
  onCopy,
}: {
  showDialog: boolean
  openDialog: () => void
  closeDialog: () => void
  onCopy: () => void
}) {
  return (
    <div className="flex min-h-[50px] items-center rounded-tl-lg rounded-tr-lg bg-white px-2 text-primary-gray-300 dark:bg-primary-gray-dark dark:text-primary-gray-200">
      <div className="p-2">
        <HashIcon />
      </div>
      <div className="p-2">
        <FileCodeIcon />
      </div>
      <div className="ml-auto text-primary-blue">
        {/* TODO: pass rawText to InternalCodeblock */}
        {/* <button
          type="button"
          className="ml-auto p-2 hover:opacity-75"
          title="Copy to clipboard"
          aria-label="Copy to clipboard"
          onClick={onCopy}
        >
          <FileCopyIcon />
        </button> */}
        <button
          className="cursor-pointer p-2 hover:opacity-75"
          title={showDialog ? "Collapse" : "Expand"}
          onClick={showDialog ? closeDialog : openDialog}
        >
          {showDialog ? <CollapseIcon /> : <ScreenFullIcon />}
        </button>
      </div>
    </div>
  )
}

function FullWidthDialog({
  showDialog,
  closeDialog,
  children,
}: {
  showDialog: boolean
  closeDialog: () => void
  children: React.ReactNode
}) {
  return (
    <Dialog open={showDialog} onClose={closeDialog}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <Dialog.Panel
        className="fixed inset-0 flex"
        style={{
          height: "75vh",
          width: "95vw",
          margin: "5vh auto 10vh auto",
        }}
      >
        <div className="h-full w-full">{children}</div>
      </Dialog.Panel>
    </Dialog>
  )
}

export function InternalCodeblock({ tall, children }: InternalCodeblockProps) {
  const [showDialog, setShowDialog] = useState(false)

  const openDialog = () => setShowDialog(true)
  const closeDialog = () => setShowDialog(false)
  const onCopy = () => navigator.clipboard.writeText("") // TODO: add copy to clipboard

  return (
    <>
      <div className="my-10 rounded-lg border border-primary-gray-100 text-xs dark:border-0">
        <Header
          openDialog={openDialog}
          closeDialog={closeDialog}
          showDialog={showDialog}
          onCopy={onCopy}
        />
        <Code
          children={children}
          innerClasses={clsx(
            "w-full",
            tall ? "max-h-[280px]" : "max-h-[130px]"
          )}
        />
      </div>
      <FullWidthDialog closeDialog={closeDialog} showDialog={showDialog}>
        <Header
          openDialog={openDialog}
          closeDialog={closeDialog}
          showDialog={showDialog}
          onCopy={onCopy}
        />
        <div className="mdx-content h-full">
          <Code children={children} innerClasses="w-full h-full" />
        </div>
      </FullWidthDialog>
    </>
  )
}
