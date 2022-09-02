import { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node"
import { temporarilyRedirectToComingSoon } from "~/utils/redirect.server"
import { getCanonicalLinkDescriptor, getMetaTitle } from "~/utils/seo.server"

export const meta: MetaFunction = () => ({
  title: getMetaTitle("SDKs"),
})

export const loader: LoaderFunction = async () => {
  temporarilyRedirectToComingSoon()
  return {}
}

export const links: LinksFunction = () => [getCanonicalLinkDescriptor("/sdks")]

export default function Page() {
  return <div>SDKs Homepage</div>
}
