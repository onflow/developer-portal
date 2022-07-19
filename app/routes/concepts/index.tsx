import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { getMetaTitle } from "~/root"
import { temporarilyRedirectToComingSoon } from "~/utils/features"
import { ConceptsPage } from "../../ui/design-system/src/lib/Pages/ConceptsPage"
import { data } from "~/cms/route-presets/concepts/data"

export const meta: MetaFunction = () => ({
  title: getMetaTitle("Concepts"),
})

export const loader: LoaderFunction = async () => {
  temporarilyRedirectToComingSoon()
}

export default function Page() {
  return (
    <ConceptsPage
      editPageUrl="https://github.com/onflow/next-docs-v1/blob/main/app/routes/concepts/data.ts"
      {...data}
    />
  )
}
