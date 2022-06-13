import { useFetcher, useLoaderData } from "@remix-run/react"
import { useEffect, useState } from "react"
import { fetchNetworkStatus } from "~/cms/utils/fetch-network-status"
import { StatuspageApiResponse } from "~/ui/design-system/src/lib/interfaces"

export async function loader() {
  return await fetchNetworkStatus()
}

export default function () {
  const loaderData: StatuspageApiResponse[] = useLoaderData()
  const [status, setStatus] = useState(loaderData)

  // Whenever the loader gives us new data(for example, after a form submission), update our `data` state.
  useEffect(() => setStatus(loaderData), [loaderData])

  const fetcher = useFetcher()

  // Get fresh data every 5 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetcher.load("/poll-network")
      }
    }, 5 * 1000)

    return () => clearInterval(interval)
  })

  // When the fetcher comes back with new data, update our `data` state.
  useEffect(() => {
    if (fetcher.data) {
      setStatus(fetcher.data)
    }
  }, [fetcher.data])

  return (
    <div>
      <h1>NETWORKS</h1>
      Number of Networks: {status.length}
      <div className="w-full">
        {status.map((s) => (
          <li id="user-content-fn-1" key={s.id}>
            Network: {s.name} - {s.status} - {s.updated_at}
          </li>
        ))}
      </div>
    </div>
  )
}
