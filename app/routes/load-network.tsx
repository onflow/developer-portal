import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import fetchNetworkStatuses from "~/cms/utils/fetch-network-status"
import { StatuspageApiResponse } from "~/libs/design-system/dist/lib/interfaces"

export type LoaderData = StatuspageApiResponse[]

export const loader: LoaderFunction = async () => {
  return fetchNetworkStatuses()
}

export default function Flips() {
  const status: LoaderData = useLoaderData()
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
