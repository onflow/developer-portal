import { json, LoaderFunction } from "@remix-run/node"
import { Link, Outlet, useCatch, useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"
import { repoList, repoPresets } from "~/constants/repos"
import { RepoSchema } from "~/constants/repos/repo-schema"
import { ErrorPage } from "~/ui/design-system/src/lib/Components/ErrorPage"
import { InternalSidebar } from "~/ui/design-system/src/lib/Components/InternalSidebar"

type LoaderData = {
  repo: string
  repoSchema: RepoSchema | null
}

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  invariant(params.repo, `expected repo param`)

  const isKnownRepo = repoList.map((r) => r.repo).includes(params.repo)
  if (!isKnownRepo) {
    throw json({ status: "unknownRepo" }, { status: 404 })
  }

  // currently we are using only the presets, evnetually here we could
  // use the github api to see if a configuration file (e.g. onflowdocs.json)
  // exists, validate it against repo-schema, and use that instead. for now,
  // we'll use the definitions in this repo
  const sidebar = repoPresets[params.repo] ?? null

  return {
    repo: params.repo,
    repoSchema: sidebar,
  }
}

export default function Repo() {
  const data = useLoaderData<LoaderData>()
  return (
    <div className="mx-4">
      <div className="flex">
        <div>
          {data.repoSchema ? (
            <InternalSidebar config={data.repoSchema.sidebar} />
          ) : (
            <div>⚠️ Missing repo config</div>
          )}
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  console.error("CatchBoundary", caught)
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
