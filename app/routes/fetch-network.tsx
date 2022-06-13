import useNetworkStatuses from "~/cms/utils/hooks-network-status"
import { StatuspageApiResponse } from "~/ui/design-system/src/lib/interfaces"

export default function NetworkStatus() {
  const status: StatuspageApiResponse[] = useNetworkStatuses()
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
