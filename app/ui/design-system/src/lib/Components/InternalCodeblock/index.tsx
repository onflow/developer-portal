// import { Dialog } from '@reach/dialog';
// import '@reach/dialog/styles.css';
import clsx from "clsx"
import React, { useState } from "react"
import { ReactComponent as CollapseIcon } from "../../../../images/content/collapse"
import { ReactComponent as FileCodeIcon } from "../../../../images/content/file-code"
import { ReactComponent as FileCopyIcon } from "../../../../images/content/file-copy"
import { ReactComponent as HashIcon } from "../../../../images/content/hash"
import { ReactComponent as ScreenFullIcon } from "../../../../images/content/screen-full"

// TODO: Cadence and dark mode MDX code highlighting

export type InternalCodeblockProps = {
  tall?: boolean
  rawText: string
  children: React.ReactNode
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
        <button
          type="button"
          className="p-2 ml-auto hover:opacity-75"
          title="Copy to clipboard"
          aria-label="Copy to clipboard"
          onClick={onCopy}
        >
          <FileCopyIcon />
        </button>
        <button
          className="p-2 cursor-pointer hover:opacity-75"
          title={showDialog ? "Collapse" : "Expand"}
          onClick={showDialog ? closeDialog : openDialog}
        >
          {showDialog ? <CollapseIcon /> : <ScreenFullIcon />}
        </button>
      </div>
    </div>
  )
}

function Code({
  innerClasses,
  children,
}: {
  innerClasses: string
  children: React.ReactNode
}) {
  return (
    <pre
      className="flex h-full w-full overflow-hidden rounded-bl-lg rounded-br-lg bg-[#FDFDFD] font-mono text-xs dark:bg-[#111111] dark:!text-white"
      style={{
        boxShadow: "rgb(0 0 0 / 3%) 0px 11px 15px 0px inset",
      }}
    >
      <div className={clsx("overflow-auto p-3", innerClasses)}>{children}</div>
    </pre>
  )
}

export function InternalCodeblock({
  tall,
  rawText,
  children,
}: InternalCodeblockProps) {
  const [showDialog, setShowDialog] = useState(false)

  const openDialog = () => setShowDialog(true)
  const closeDialog = () => setShowDialog(false)
  const onCopy = () => navigator.clipboard.writeText(rawText)

  return (
    <>
      <div className="text-xs border rounded-lg border-primary-gray-100 dark:border-0">
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
      {/* <Dialog
        isOpen={showDialog}
        onDismiss={closeDialog}
        className="flex flex-col rounded-lg !p-0 dark:bg-[#111111]"
        style={{
          height: '75vh',
          width: '95vw',
          margin: '5vh auto',
        }}
      >
        <div className="h-full">
          <Header
            openDialog={openDialog}
            closeDialog={closeDialog}
            showDialog={showDialog}
            onCopy={onCopy}
          />

          <div className="h-full mdx-content">
            <Code children={children} innerClasses="w-full h-full" />
          </div>
        </div>
      </Dialog> */}
    </>
  )
}
