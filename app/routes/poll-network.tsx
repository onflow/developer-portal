// This route is only for testing network API functionalities. This page should not be discoverable by the navigation.
import { useFetcher, useLoaderData } from "@remix-run/react"
import { useEffect, useState } from "react"
import { POLLING_INTERVAL_FIVE_SECONDS } from "~/cms/utils/constants"
import { fetchNetworkStatus } from "~/cms/utils/fetch-network-status"
import { StatuspageApiResponse } from "~/ui/design-system/src/lib/interfaces"

export type LoaderData = {
  statuseResponses: StatuspageApiResponse[]
}

export async function loader(): Promise<LoaderData> {
  const networkStatus = await fetchNetworkStatus()
  return {
    statuseResponses: networkStatus,
  }
}

export default function () {
  const networkData = useLoaderData<LoaderData>()
  const [status, setStatus] = useState(networkData)

  // Whenever the loader gives us new data(for example, after a form submission), update our `data` state.
  useEffect(() => setStatus(networkData), [networkData])

  const fetcher = useFetcher()

  // Get fresh data every 5 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetcher.load("/poll-network")
      }
    }, POLLING_INTERVAL_FIVE_SECONDS)

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
      Number of Networks: {status.statuseResponses.length}
      <div className="w-full">
        {status.statuseResponses.map((s) => (
          <li id="user-content-fn-1" key={s.id}>
            Network: {s.name} - {s.status} - {s.updated_at}
          </li>
        ))}
      </div>
    </div>
  )
}
