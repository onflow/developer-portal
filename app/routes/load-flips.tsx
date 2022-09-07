// This route is only for testing API functionalities. This page should not be discoverable by the navigation.
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { fetchFlips } from "~/cms/utils/fetch-flips"

type LoaderData = Awaited<ReturnType<typeof fetchFlips>>

export const loader = async () => {
  const data = await fetchFlips()
  return json<LoaderData>(data)
}

export default function Flips() {
  const { openFlips, goodPlacesToStartFlips } = useLoaderData<typeof loader>()

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
