import { useFetcher, useLoaderData } from "@remix-run/react"
import { useEffect, useState } from "react"
import {
  fetchBreakingChangesPosts,
  fetchMainnetSporkPosts,
  Topic,
} from "~/cms/utils/fetch-discourse-api"
import { formatDistance } from "date-fns"
import { POLLING_INTERVAL } from "~/cms/utils/constants"

type LoaderData = {
  breakingChanges: Topic[]
  sporks: Topic[]
}

const ABOUT_THIS_CATEGORY_BREAKING_CHANGES = 762
const ABOUT_THIS_CATEGORY_SPORK = 2543

var getRelativeDate = (created_at: string) =>
  formatDistance(new Date(created_at), new Date())

function sortTopics(topics: Topic[], removeCategoryId: number) {
  const sorted: Topic[] = topics
    .filter((post: Topic) => post.id !== removeCategoryId)
    .sort((a, b) => {
      return new Date(a.created_at).getTime() > new Date(b.created_at).getTime()
        ? -1
        : 1
    })

  return sorted
}

export async function loader(): Promise<LoaderData> {
  const breakingChangesPosts = await fetchBreakingChangesPosts()
  const sporksPosts = await fetchMainnetSporkPosts()
  return {
    breakingChanges: sortTopics(
      breakingChangesPosts,
      ABOUT_THIS_CATEGORY_BREAKING_CHANGES
    ),
    sporks: sortTopics(sporksPosts, ABOUT_THIS_CATEGORY_SPORK),
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
    }, POLLING_INTERVAL)

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
            Breaking Change Topic: {getRelativeDate(t.created_at)} - {t.title}
          </li>
        ))}
      </div>
      <h1>Mainnet Spork Topics</h1>
      Count: {discourseData.sporks.length}
      <div className="w-full">
        {discourseData.sporks.map((t) => (
          <li id="user-content-fn-1" key={t.id}>
            Spork Topic: {getRelativeDate(t.created_at)} - {t.title}
          </li>
        ))}
      </div>
    </div>
  )
}
