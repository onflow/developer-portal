import {
  AutocompleteState,
  BaseItem,
  createAutocomplete,
} from "@algolia/autocomplete-core"
import { getAlgoliaResults } from "@algolia/autocomplete-js"
import { SearchClient } from "algoliasearch/lite"
import { KeyboardEvent, useMemo, useRef, useState } from "react"
import { ReactComponent as SearchIcon } from "../../../../images/action/search"
import { Panel } from "./Panel"

export type SearchProps = {
  appId: string
  apiKey: string
  indexName: string
}

export type HitType = BaseItem & {
  url: string
  title: string
  headers: string[]
  depth: number
}

export function Autocomplete({
  searchClient,
  indexName,
  closeDialog,
}: {
  searchClient: SearchClient
  indexName: string
  closeDialog: () => void
}) {
  const [autocompleteState, setAutocompleteState] =
    useState<AutocompleteState<HitType>>()
  const inputRef = useRef(null)

  const autocomplete = useMemo(
    () =>
      createAutocomplete<HitType, Event, MouseEvent, globalThis.KeyboardEvent>({
        detachedMediaQuery: "",
        autoFocus: true,
        onStateChange({ state }) {
          setAutocompleteState(state)
        },
        // @ts-expect-error
        getSources() {
          return [
            {
              sourceId: indexName,
              getItemInputValue({ item }) {
                return item.query
              },
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: indexName,
                      query,
                      params: {
                        hitsPerPage: 20,
                        highlightPreTag: "<mark>",
                        highlightPostTag: "</mark>",
                      },
                    },
                  ],
                })
              },
              getItemUrl({ item }) {
                return item.url
              },
            },
          ]
        },
      }),
    [indexName, searchClient]
  )
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  })

  return (
    <div
      className="h-full rounded-md bg-white dark:bg-black"
      {...autocomplete.getRootProps({})}
      style={{ maxWidth: "80vw" }}
    >
      {/* @ts-expect-error */}
      <form
        className="flex h-full flex-col"
        {...autocomplete.getFormProps({ inputElement: inputRef.current })}
      >
        <div className="relative flex items-center">
          <div className="absolute left-5 scale-75 dark:text-primary-green">
            <SearchIcon />
          </div>
          {/* @ts-expect-error */}
          <input
            className="h-16 w-full rounded-md bg-white px-14 pt-4 pb-3 text-base text-black !ring-0 focus:border-[#02D77E] dark:bg-black dark:text-white"
            ref={inputRef}
            {...inputProps}
            onKeyDown={(e: KeyboardEvent) => {
              if (e.key === "Escape") {
                closeDialog()
                return
              }
              // @ts-expect-error: TODO: Short description of the error
              inputProps.onKeyDown(e)
            }}
            type="text"
          />
          <button
            onClick={closeDialog}
            className="absolute right-5 text-primary-gray-300 hover:opacity-75 dark:text-primary-gray-200"
          >
            ESC
          </button>
        </div>
        <Panel
          autocomplete={autocomplete}
          autocompleteState={autocompleteState}
        />
      </form>
    </div>
  )
}
