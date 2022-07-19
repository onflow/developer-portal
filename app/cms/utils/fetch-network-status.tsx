import { StatuspageApiResponse } from "~/ui/design-system/src/lib/interfaces"
import { getRequiredServerEnvVar } from "~/cms/utils/env-utils"
import { STATUSPAGE_API_URL } from "~/constants"

export async function fetchNetworkStatus() {
  const key = getRequiredServerEnvVar("STATUSPAGE_API_KEY")
  const response = await fetch(STATUSPAGE_API_URL, {
    headers: {
      Authorization: `OAuth ${key}`,
    },
  }).then((r) => r.json())

  const status = await response
  return status as StatuspageApiResponse[]
}
