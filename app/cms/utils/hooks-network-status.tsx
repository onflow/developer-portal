import { useState } from "react"
import useSWR from "swr"
import { StatuspageApiResponse } from "~/ui/design-system/src/lib/interfaces"
import { STATUSPAGE_API_KEY, STATUSPAGE_API_URL } from "./constants"

export default function useNetworkStatuses() {
  const [networkStatus, setNetworkStatus] = useState<StatuspageApiResponse[]>(
    []
  )

  useSWR(
    `${STATUSPAGE_API_URL}`,
    (url) =>
      fetch(url, {
        headers: {
          Authorization: `OAuth ${STATUSPAGE_API_KEY}`,
        },
      }).then((r) => r.json()),
    {
      refreshInterval: 100000,
      onSuccess: (result) => {
        console.log("setting from result")
        setNetworkStatus(result)
      },
    }
  )
  console.log("network status", networkStatus)
  return networkStatus as StatuspageApiResponse[]
}
