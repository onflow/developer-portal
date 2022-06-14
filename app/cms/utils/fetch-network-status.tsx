import { StatuspageApiResponse } from "~/ui/design-system/src/lib/interfaces"
import { STATUSPAGE_API_KEY, STATUSPAGE_API_URL } from "./constants"

export async function fetchNetworkStatus() {
  const response = await fetch(STATUSPAGE_API_URL, {
    headers: {
      Authorization: `OAuth ${STATUSPAGE_API_KEY}`,
    },
  }).then((r) => r.json())

  const status = await response
  return status as StatuspageApiResponse[]
}
