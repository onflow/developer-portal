import { useFetcher, useLoaderData } from "@remix-run/react"
import { useEffect, useState } from "react"
import {
  fetchBreakingChangesPosts,
  fetchMainnetSporkPosts,
  Topic,
} from "~/cms/utils/fetch-discourse-api"

type LoaderData = {
  breakingChanges: Topic[]
  sporks: Topic[]
}

export async function loader(): Promise<LoaderData> {
  const breakingChangesPosts = await fetchBreakingChangesPosts()
  const sporksPosts = await fetchMainnetSporkPosts()
  return {
    breakingChanges: breakingChangesPosts,
    sporks: sporksPosts,
  }
}

export default function () {
  const data = useLoaderData<LoaderData>()
  const [discourseData, setDiscourseData] = useState(data)

  // Whenever the loader gives us new data(for example, after a form submission), update our `data` state.
  useEffect(() => setDiscourseData(data), [data])

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
      setDiscourseData(fetcher.data)
    }
  }, [fetcher.data])

  return (
    <div>
      <h1>Breaking Changes Topics</h1>
      Count: {discourseData.breakingChanges.length}
      <div className="w-full">
        {discourseData.breakingChanges.map((t) => (
          <li id="user-content-fn-1" key={t.id}>
            Breaking Change Topic: {t.__formatted_date} - {t.title} -{" "}
            {t.featured_link}
          </li>
        ))}
      </div>
      <h1>Mainnet Spork Topics</h1>
      Count: {discourseData.sporks.length}
      <div className="w-full">
        {discourseData.sporks.map((t) => (
          <li id="user-content-fn-1" key={t.id}>
            Spork Topic: {t.__formatted_date} - {t.title} - {t.featured_link}
          </li>
        ))}
      </div>
    </div>
  )
}
