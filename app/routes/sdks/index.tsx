import { LoaderFunction } from "@remix-run/server-runtime"
import { temporarilyRedirectToComingSoon } from "~/utils/features"

export const loader: LoaderFunction = async () => {
  temporarilyRedirectToComingSoon()
  return {}
}

export default function Page() {
  return <div>SDKs Homepage</div>
}
