import { MetaFunction } from "@remix-run/node"
import { LoaderFunction } from "@remix-run/server-runtime"
import { getMetaTitle } from "~/root"
import { temporarilyRedirectToComingSoon } from "~/utils/features"

export const meta: MetaFunction = () => ({
  title: getMetaTitle("SDKs"),
})

export const loader: LoaderFunction = async () => {
  temporarilyRedirectToComingSoon()
  return {}
}

export default function Page() {
  return <div>Nodes Homepage</div>
}
