import { MetaFunction } from "@remix-run/node"
import { LoaderFunction } from "@remix-run/server-runtime"
import { temporarilyRedirectToComingSoon } from "~/utils/redirect.server"
import { getMetaTitle } from "~/utils/seo"

export const meta: MetaFunction = () => ({
  title: getMetaTitle("SDKs"),
})

export const loader: LoaderFunction = async () => {
  temporarilyRedirectToComingSoon()
  return {}
}

export default function Page() {
  return <div>SDKs Homepage</div>
}
