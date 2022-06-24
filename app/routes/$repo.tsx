import { json, LoaderFunction } from "@remix-run/node"
import {
  Link,
  Outlet,
  useCatch,
  useLoaderData,
  useMatches,
} from "@remix-run/react"
import invariant from "tiny-invariant"
import { ContentSpec, getContentSpec } from "~/constants/repos"
import { ErrorPage } from "~/ui/design-system/src/lib/Components/ErrorPage"
import { temporarilyRedirectToComingSoon } from "~/utils/features"
import { InternalPage } from "../ui/design-system/src/lib/Pages/InternalPage"

type LoaderData = {
  content: ContentSpec
}

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  temporarilyRedirectToComingSoon()

  const contentName = params.repo
  invariant(contentName, `expected repo param`)

  const contentSpec = getContentSpec(contentName)

  if (!contentSpec) {
    throw json({ status: "unknownRepo" }, { status: 404 })
  }

  // currently we are using only the presets, evnetually here we could
  // use the github api to see if a configuration file (e.g. onflowdocs.json)
  // exists, validate it against repo-schema, and use that instead. for now,
  // we'll use the definitions in this repo

  return { content: contentSpec }
}

export default function Repo() {
  const { content } = useLoaderData<LoaderData>()
  const matches = useMatches()
  const [match] = matches.slice(-1)

  return (
    <InternalPage
      activePath={match.params["*"] || "index"}
      contentDisplayName={content.displayName}
      contentPath={content.contentName}
      sidebarConfig={content.schema?.sidebar}
    >
      <Outlet />
    </InternalPage>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  console.error("CatchBoundary $repo", caught)
  if (caught.data.status === "unknownRepo") {
    return (
      <ErrorPage
        title={"404 – Unknown repo"}
        subtitle={`This repo is not available or does not exist`}
        actions={
          <Link className="underline" to="/">
            Go home
          </Link>
        }
      />
    )
  }

  throw new Error(`Unhandled error: ${caught.status}`)
}
