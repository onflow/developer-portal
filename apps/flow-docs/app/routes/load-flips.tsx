import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { FlipCellProps } from "../../../../libs/design-system/src/lib/Components/FlipCell"
import { fetchFlips } from "~/cms/utils/fetch-flips"

export type LoaderData = FlipCellProps[]

export const loader: LoaderFunction = async () => {
  return fetchFlips()
}

export default function Flips() {
  const flips: FlipCellProps[] = useLoaderData()
  return (
    <div>
      <h1>FLIPS</h1>
      Number of Open FLIP PRs: {flips.length}
      <div className="w-full">
        {flips.map((flip) => (
          <li id="user-content-fn-1" key={flip.forumLink}>
            Link: {flip.forumLink} - {flip.heading} - {flip.numComments}
          </li>
        ))}
      </div>
    </div>
  )
}
