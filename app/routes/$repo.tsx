import { json, LoaderFunction } from "@remix-run/node"
import { Link, Outlet, useCatch, useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"
import repos from "~/constants/repos.json"
import { ErrorPage } from "~/ui/design-system/src/lib/Components/ErrorPage"

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.repo, `expected repo param`)

  const isKnownRepo = repos.map((r) => r.repo).includes(params.repo)
  if (!isKnownRepo) {
    throw json({ status: "unknownRepo" }, { status: 404 })
  }

  return {
    repo: params.repo,
  }
}

export default function Repo() {
  const data = useLoaderData()
  return (
    <div>
      <div>REPO: {data.repo}</div>
      <Outlet />
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
