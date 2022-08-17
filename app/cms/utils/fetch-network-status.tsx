import { StatuspageApiResponse } from "~/ui/design-system/src/lib/interfaces"
import { getRequiredServerEnvVar } from "../helpers"
import { STATUSPAGE_API_URL } from "./constants"

export async function fetchNetworkStatus() {
  const key = getRequiredServerEnvVar("STATUSPAGE_API_KEY")
  const response = await fetch(STATUSPAGE_API_URL, {
    headers: {
      Authorization: `OAuth ${key}`,
    },
  }).then((r) => r.json())

  const status = response.filter(
    (network: any) => network.name !== "Flow Canarynet" // Filter out canarynet for now until we have sporks data.
  )
  return status as StatuspageApiResponse[]
}
