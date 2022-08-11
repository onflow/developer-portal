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

const LS_KEY = "flow_network_data"

export default function () {
  const networkData = useLoaderData<LoaderData>()
  const cachedStatus = localStorage.getItem(LS_KEY)
  const [status, setStatus] = useState(
    cachedStatus ? JSON.parse(cachedStatus) : networkData
  )

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
      localStorage.setItem(LS_KEY, JSON.stringify(status))
    }
  }, [fetcher.data])

  const renderStatus = (status: string) => {
    const statusText =
      status === "operational" ? "Healthy" : "Under Maintenance"
    return (
      <span
        className={
          status === "operational" ? "text-green-success" : "text-primary-red"
        }
      >
        {statusText}
      </span>
    )
  }

  return (
    <div className="w-full">
      {!status.statusResponses && <span>Loading...</span>}
      {status.statusResponses &&
        status.statusResponses.map((s: StatuspageApiResponse) => (
          <li
            id="user-content-fn-1"
            key={s.id}
            className="my-3 flex items-center justify-between rounded-md border border-primary-gray-100 px-4 py-2 dark:border-primary-gray-400"
          >
            <div className="flex items-center">
              <div
                className="mr-2 inline-block h-4 w-4 rounded-full"
                style={{
                  backgroundColor:
                    s.status === "operational" ? "#05CE7A" : "#F67D65",
                }}
              ></div>
              {s.name}
            </div>
            {renderStatus(s.status)}
          </li>
        ))}
    </div>
  )
}
