import { LoaderFunction } from "@remix-run/node"
import { temporarilyRedirectToComingSoon } from "~/utils/features"
import { ConceptsPage } from "../../ui/design-system/src/lib/Pages/ConceptsPage"
import { data } from "./data"

export const loader: LoaderFunction = async () => {
  temporarilyRedirectToComingSoon()
}

export default function Page() {
  return <ConceptsPage {...data} />
}
