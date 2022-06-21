// This route is only for testing API functionalities. This page should not be discoverable by the navigation.
import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { fetchFlips } from "~/cms/utils/fetch-flips"
import { FlipsProps } from "~/ui/design-system/src/lib/Components/Flips"

type LoaderData = FlipsProps

export const loader: LoaderFunction = async () => {
  return fetchFlips()
}

export default function Flips() {
  const { openFlips, goodPlacesToStartFlips }: LoaderData = useLoaderData()
  return (
    <div>
      <h1>FLIPS</h1>
      Number of Open FLIP PRs: {openFlips.length}
      <div className="w-full">
        {openFlips.map((flip) => (
          <li id="user-content-fn-1" key={flip.forumLink}>
            Link: {flip.participant.name} - {flip.heading} - {flip.numComments}
          </li>
        ))}
      </div>
      Number of Good Places To Start FLIP PRs: {goodPlacesToStartFlips.length}
      <div className="w-full">
        {goodPlacesToStartFlips.map((flip) => (
          <li id="user-content-fn-1" key={flip.forumLink}>
            Link: {flip.participant.name} - {flip.heading} - {flip.numComments}
          </li>
        ))}
      </div>
    </div>
  )
}
