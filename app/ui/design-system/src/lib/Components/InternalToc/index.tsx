import clsx from "clsx"

export type InternalTocItem = {
  title: string
  hash: URL["hash"]
}

export type InternalTocProps = {
  headings: InternalTocItem[]
  currentHash: URL["hash"]
  updateHash: (hash: string) => void
}

export function InternalToc({
  headings,
  currentHash,
  updateHash,
}: InternalTocProps) {
  if (headings == null) {
    throw new Error(`headings missing`)
  }

  return (
    <div
      className="sticky top-[92px] ml-auto h-auto w-full shrink-0 flex-col self-start overflow-y-auto p-4"
      // 96px (main nav height) + 37px (bread crumb height) + 55px (top padding) + 20px (bottom padding) = 208px
      // if this list overflows, make it fit within the space between
      // the breadcrumbs and bottom of the viewport
      style={{ maxHeight: "calc(100vh - 208px)" }}
    >
      <div className="mb-6 px-5 text-2xs uppercase text-gray-500">
        On this page
      </div>
      <div className="border-l-1 border-l border-l-gray-100 bg-opacity-80 dark:border-l-gray-800">
        {headings.map(({ title, hash }, index) => (
          <div className="flex" key={index}>
            <a
              href={hash}
              className={clsx(
                "mb-1 cursor-pointer py-2 px-5 text-sm text-primary-gray-400 hover:opacity-75 dark:text-gray-200",
                {
                  "bg-gray-100 bg-opacity-75 font-semibold text-primary-blue dark:bg-primary-gray-dark dark:text-gray-300":
                    hash === currentHash,
                }
              )}
            >
              {title}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
