import algoliasearch from "algoliasearch/lite"
import { useCallback, useEffect, useMemo, useState } from "react"
import { InstantSearch } from "react-instantsearch-hooks-web"
import { ReactComponent as SearchIcon } from "../../../../images/action/search"
import { Dialog } from "../Dialog"
import { Autocomplete } from "./Autocomplete"

export type SearchProps = {
  appId: string
  apiKey: string
  indexName: string
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
        className="flex items-center hover:opacity-75"
      >
        <div className="mr-1 scale-75">
          <SearchIcon />
        </div>
        Search
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
