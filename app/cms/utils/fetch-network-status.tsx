import { StatuspageApiResponse } from "~/ui/design-system/src/lib/interfaces"
import { getRequiredServerEnvVar } from "../helpers"
import { STATUSPAGE_API_URL } from "./constants"

export async function fetchNetworkStatus() {
  const key = getRequiredServerEnvVar("STATUSPAGE_API_KEY")
  const response = await fetch(STATUSPAGE_API_URL, {
    headers: {
      Authorization: `OAuth ${key}`,
    },
  })
  const data = await response.json()
  return data as StatuspageApiResponse[]
}
