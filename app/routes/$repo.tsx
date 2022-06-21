import { json, LoaderFunction } from "@remix-run/node"
import { Link, Outlet, useCatch, useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"
import {
  repoList,
  repoPresets,
  flowContentPresets,
  flowContentNames,
} from "~/constants/repos"
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
  const content = params.repo

  invariant(content, `expected repo param`)

  const isKnownRepo = repoList.map((r) => r.repo).includes(content)
  if (!isKnownRepo) {
    throw json({ status: "unknownRepo" }, { status: 404 })
  }

  // Flow Repository has additional internal content. If Flow repository is loaded, look for different sidebars
  if (flowContentNames.includes(content)) {
    return {
      repo: "flow",
      repoSchema: flowContentPresets[content] ?? null,
    }
  } else {
    return {
      repo: content,
      repoSchema: repoPresets[content] ?? null,
    }
  }

  // currently we are using only the presets, evnetually here we could
  // use the github api to see if a configuration file (e.g. onflowdocs.json)
  // exists, validate it against repo-schema, and use that instead. for now,
  // we'll use the definitions in this repo
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
