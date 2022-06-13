import { useFetcher, useLoaderData } from "@remix-run/react"
import { useEffect, useState } from "react"
import {
  fetchBreakingChangesPosts,
  Topic,
} from "~/cms/utils/fetch-discourse-api"

export async function loader() {
  return await fetchBreakingChangesPosts()
}

export default function () {
  const loaderData: Topic[] = useLoaderData()
  const [breakingChangesTopics, setBreakingChangesTopics] = useState(loaderData)

  // Whenever the loader gives us new data(for example, after a form submission), update our `data` state.
  useEffect(() => setBreakingChangesTopics(loaderData), [loaderData])

  const fetcher = useFetcher()

  // Get fresh data every 5 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetcher.load("/poll-discourse")
      }
    }, 5 * 1000)

    return () => clearInterval(interval)
  })

  // When the fetcher comes back with new data, update our `data` state.
  useEffect(() => {
    if (fetcher.data) {
      setBreakingChangesTopics(fetcher.data)
    }
  }, [fetcher.data])

  return (
    <div>
      <h1>Breaking Changes Topics</h1>
      Number: {breakingChangesTopics.length}
      <div className="w-full">
        {breakingChangesTopics.map((t) => (
          <li id="user-content-fn-1" key={t.id}>
            Network: {t.__formatted_date} - {t.title} - {t.featured_link}
          </li>
        ))}
      </div>
    </div>
  )
}
