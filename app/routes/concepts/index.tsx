import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { getMetaTitle } from "~/root"
import { temporarilyRedirectToComingSoon } from "~/utils/features"
import { ConceptsPage } from "../../ui/design-system/src/lib/Pages/ConceptsPage"
import { data } from "./data"

export const meta: MetaFunction = () => ({
  title: getMetaTitle("Concepts"),
})

export const loader: LoaderFunction = async () => {
  // temporarilyRedirectToComingSoon()
  return {}
}

export default function Page() {
  return <ConceptsPage {...data} />
}
