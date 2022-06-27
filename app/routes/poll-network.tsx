// This route is only for testing network API functionalities. This page should not be discoverable by the navigation.
import { useFetcher, useLoaderData } from "@remix-run/react"
import { useEffect, useState } from "react"
import { POLLING_INTERVAL_FIVE_SECONDS } from "~/cms/utils/constants"
import { fetchNetworkStatus } from "~/cms/utils/fetch-network-status"
import { StatuspageApiResponse } from "~/ui/design-system/src/lib/interfaces"

export type LoaderData = {
  statusResponses: StatuspageApiResponse[]
}

export async function loader(): Promise<LoaderData> {
  const networkStatus = await fetchNetworkStatus()
  return {
    statusResponses: networkStatus,
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
    <>
      <div className="w-full">
        {!status.statusResponses && <span>Loading...</span>}
        {status.statusResponses &&
          status.statusResponses.map((s) => (
            <li id="user-content-fn-1" key={s.id} className="flex items-center">
              <div
                className="mb-1 mr-2 inline-block h-4 w-4 rounded-full"
                style={{
                  backgroundColor:
                    s.status === "operational" ? "#05CE7A" : "#F67D65",
                }}
              ></div>
              {s.name} (
              {s.status === "operational" ? "Healthy" : "Under Maintenance"})
            </li>
          ))}
      </div>
    </>
  )
}
