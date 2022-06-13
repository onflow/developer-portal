import { useFetcher, useLoaderData } from "@remix-run/react"
import { useEffect, useState } from "react"
import {
  fetchBreakingChangesPosts,
  Topic,
} from "~/cms/utils/fetch-discourse-api"

type LoaderData = {
  topics: Topic[]
}

export async function loader(): Promise<LoaderData> {
  const breakingChanges = await fetchBreakingChangesPosts()
  return {
    topics: breakingChanges,
  }
}

export default function () {
  const discourseData = useLoaderData<LoaderData>()
  const [breakingChanges, setBreakingChanges] = useState(discourseData)

  // Whenever the loader gives us new data(for example, after a form submission), update our `data` state.
  useEffect(() => setBreakingChanges(discourseData), [discourseData])

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
      setBreakingChanges(fetcher.data)
    }
  }, [fetcher.data])

  return (
    <div>
      <h1>Breaking Changes Topics</h1>
      Count: {breakingChanges.topics.length}
      <div className="w-full">
        {breakingChanges.topics.map((t) => (
          <li id="user-content-fn-1" key={t.id}>
            Breaking Change Topic: {t.__formatted_date} - {t.title} -{" "}
            {t.featured_link}
          </li>
        ))}
      </div>
    </div>
  )
}
