import useSWR from "swr"
import { NetworkCardProps } from "~/libs/design-system/src/lib/Components/NetworkCard"
import { StatuspageApiResponse } from "~/libs/design-system/src/lib/interfaces"

// TODO: Move keys/env to .env or a constants file?
const STATUSPAGE_API_URL =
  "https://api.statuspage.io/v1/pages/ytw5bdg6zr13/components"
const MAINNET_STATUSPAGE_ID = "fqvhhbc3hdw8"
const TESTNET_STATUSPAGE_ID = "g9d7vtywpdfq"
const CANARYNET_STATUSPAGE_ID = "s4z9n7p9pm3s"
const STATUSPAGE_API_KEY = "e6278eb7-27f1-4795-adce-9a0751a4a31c"

export default function fetchNetworkStatuses(): StatuspageApiResponse[] {
  const { data, error } = useSWR(
    `${STATUSPAGE_API_URL}`,
    (url) =>
      fetch(url, {
        headers: {
          Authorization: `OAuth ${STATUSPAGE_API_KEY}`,
        },
      }).then((r) => r.json()),
    {
      refreshInterval: 100000,
    }
  )

  return data // should match the format in 'libs/design-system/src/lib/Pages/NetworkPage/sample.ts'
}
