import clsx from "clsx"
import { useEffect, useState } from "react"

type InternalTocItem = {
  title: string
  hash: string
}

export type InternalTocProps = {
  headings: InternalTocItem[]
}

export function InternalToc({ headings }: InternalTocProps) {
  // const [hash, setHash] = useState("")
  // useEffect(() => {
  //   setHash(location.hash)
  // }, [location.hash])

  return (
    <div className="sticky top-0 ml-auto h-auto w-full shrink-0 flex-col self-start p-4">
      <div className="mb-6 px-5 text-2xs uppercase text-gray-500">
        On this page
      </div>
      <div className="border-l-1 border-l border-l-gray-100 bg-opacity-80 dark:border-l-gray-800">
        {/* TODO: Fix: We have to slice otherwise we get the page title */}
        {headings.slice(1, headings.length).map(({ title, hash }) => {
          return (
            <div className="flex" key={hash}>
              <a
                href={hash}
                className={clsx(
                  "mb-1 cursor-pointer py-2 px-5 text-sm text-primary-gray-400 hover:opacity-75 dark:text-gray-200"
                  // {
                  //   "bg-gray-100 bg-opacity-75 font-semibold text-primary-blue dark:bg-primary-gray-dark dark:text-gray-300":
                  //     hash === path,
                  // }
                )}
              >
                {title}
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
