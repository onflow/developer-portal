import clsx from "clsx"
import { useState } from "react"
import { Theme } from "~/cms/utils/theme.provider"
import { ReactComponent as CollapseIcon } from "../../../../images/content/collapse"
import { ReactComponent as FileCopyIcon } from "../../../../images/content/file-copy"
import { ReactComponent as HashIcon } from "../../../../images/content/hash"
import { ReactComponent as ScreenFullIcon } from "../../../../images/content/screen-full"
import { Dialog } from "../Dialog"
import { INTERNAL_SUBNAV_HEIGHT } from "../InternalSubnav"
import { NAV_HEIGHT } from "../NavigationBar"
import { Code } from "./Code"

const NAV_BARS_HEIGHT = NAV_HEIGHT + INTERNAL_SUBNAV_HEIGHT + 100

function Header({
  open,
  openDialog,
  closeDialog,
  onCopy,
}: {
  open: boolean
  openDialog: () => void
  closeDialog: () => void
  onCopy: () => void
}) {
  return (
    <div className="flex min-h-[50px] items-center rounded-tl-lg rounded-tr-lg bg-white px-2 text-primary-gray-300 dark:bg-primary-gray-dark dark:text-primary-gray-200">
      <div className="p-2">
        <HashIcon />
      </div>
      <div className="ml-auto text-primary-blue">
        <button
          type="button"
          className="ml-auto p-2 hover:opacity-75"
          title="Copy to clipboard"
          aria-label="Copy to clipboard"
          onClick={onCopy}
        >
          <FileCopyIcon />
        </button>
        <button
          className="cursor-pointer p-2 hover:opacity-75"
          title={open ? "Collapse" : "Expand"}
          onClick={open ? closeDialog : openDialog}
        >
          {open ? <CollapseIcon /> : <ScreenFullIcon />}
        </button>
      </div>
    </div>
  )
}

export type InternalCodeblockProps = {
  constrained?: boolean
  theme: Theme | null
  children: JSX.Element
  className?: string
}

export function InternalCodeblock({
  constrained,
  theme,
  children,
  className,
}: InternalCodeblockProps) {
  const [open, setOpen] = useState(false)
  const openDialog = () => setOpen(true)
  const closeDialog = () => setOpen(false)
  const codeString = children?.props?.children
  const onCopy = () => navigator.clipboard.writeText(codeString)

  return (
    <>
      <div
        className={clsx(
          className,
          `my-10 rounded-lg border border-primary-gray-100 text-xs dark:border-0`
        )}
      >
        <Header
          openDialog={openDialog}
          closeDialog={closeDialog}
          open={open}
          onCopy={onCopy}
        />
        <Code
          language={children.props.className}
          code={codeString}
          innerClasses={clsx("w-full")}
          innerStyle={{
            maxHeight: constrained ? 280 : `calc(100vh - ${NAV_BARS_HEIGHT}px)`,
          }}
          theme={theme}
        />
      </div>
      <Dialog closeDialog={closeDialog} open={open}>
        <Header
          openDialog={openDialog}
          closeDialog={closeDialog}
          open={open}
          onCopy={onCopy}
        />
        <div className="mdx-content h-full">
          <Code
            language={children.props.className}
            code={codeString}
            innerClasses="w-full h-full"
            theme={theme}
          />
        </div>
      </Dialog>
    </>
  )
}
