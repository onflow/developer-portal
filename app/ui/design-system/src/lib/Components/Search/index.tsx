import algoliasearch from "algoliasearch/lite"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { InstantSearch } from "react-instantsearch-hooks-web"
import { ReactComponent as SearchIcon } from "../../../../images/action/search"
import { Dialog } from "../Dialog"
import { Autocomplete } from "./Autocomplete"

export type SearchProps = {
  appId: string
  apiKey: string
  indexName: string
}

function KbdContent({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center rounded border-t border-l border-r border-white leading-none dark:border-gray-400"
      style={{
        boxShadow:
          "0 4px 11px 0 rgb(37 44 97 / 15%), 0 1px 3px 0 rgb(93 100 148 / 60%)",
      }}
    >
      {children}
    </div>
  )
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="to-gray-300-opacity-60 mr-1 flex h-6 w-6 items-center justify-center rounded border-b-2 border-gray-200 bg-gradient-to-tl from-gray-200 text-gray-500/75 group-hover:opacity-75 dark:border-gray-800 dark:from-gray-800 dark:to-gray-900 dark:text-gray-400">
      {children}
    </kbd>
  )
}

function KbdShortcuts() {
  return (
    <div className="-mt-1 flex flex-grow-0 items-center">
      <Kbd>
        <KbdContent>
          <span className="flex h-full items-center justify-center text-lg">
            ⌘
          </span>
        </KbdContent>
      </Kbd>
      <Kbd>
        <KbdContent>
          <span className="-mt-[1px] flex h-full items-center justify-center text-sm">
            K
          </span>
        </KbdContent>
      </Kbd>
    </div>
  )
}

export function Search({ appId, apiKey, indexName }: SearchProps) {
  const [open, setOpen] = useState(false)
  const closeDialog = () => setOpen(false)
  const searchClient = useMemo(
    () => algoliasearch(appId, apiKey),
    [apiKey, appId]
  )

  const onKeyDown = useCallback(({ repeat, metaKey, ctrlKey, key }) => {
    if (repeat) return
    // Open search dialog with cmd+k or ctrl+k
    if ((metaKey || ctrlKey) && key === "k") setOpen((prev) => !prev)
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [onKeyDown])

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="group flex items-center hover:text-primary-blue dark:hover:text-blue-hover-dark"
      >
        <div className="mr-1 scale-75">
          <SearchIcon />
        </div>
        <span className="mr-3">Search</span>
        <KbdShortcuts />
      </button>
      <InstantSearch searchClient={searchClient} indexName={indexName}>
        <Dialog open={open} closeDialog={closeDialog} maxWidth="695px">
          <Autocomplete
            searchClient={searchClient}
            indexName={indexName}
            closeDialog={closeDialog}
          />
        </Dialog>
      </InstantSearch>
    </>
  )
}
