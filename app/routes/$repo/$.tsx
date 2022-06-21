import { LoaderFunction } from "@remix-run/node"
import { getMdxPage, useMdxComponent } from "~/cms/utils/mdx"
import { json } from "@remix-run/node"
import { Link, useCatch, useLoaderData, useLocation } from "@remix-run/react"
import invariant from "tiny-invariant"
import { ErrorPage } from "~/ui/design-system/src/lib/Components/ErrorPage"
import { flowContentNames } from "~/constants/repos"

export const loader: LoaderFunction = async ({ params, request }) => {
  const content = params["repo"]
  const repo = flowContentNames.includes(content ?? "") ? "flow" : content
  const pathParams = params["*"] || "index"
  const fileOrDirPath = flowContentNames.includes(content ?? "")
    ? `content/${content}/${pathParams}`
    : pathParams

  invariant(repo, `expected a value`)
  let page
  try {
    page = await getMdxPage(
      {
        repo,
        fileOrDirPath,
      },
      { request, forceFresh: process.env.FORCE_REFRESH === "true" }
    )
  } catch (e) {
    throw json({ status: "noPage" }, { status: 500 })
  }

  if (!page) {
    throw json({ status: "noPage" }, { status: 404 })
  }

  return {
    page,
  }
}

export default function () {
  const data = useLoaderData()
  const { code, frontmatter } = data.page
  const Component = useMdxComponent({ code, frontmatter })

  return (
    <div className="flex flex-col py-8 md:flex-row">
      <Component />
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  console.error("CatchBoundary", caught)
  const location = useLocation()
  if (caught.data.status === "noPage") {
    return (
      <ErrorPage
        title={"404 – Page not found"}
        subtitle={`there is no page at "${location.pathname}"`}
        actions={
          <Link className="underline" to="/">
            Go home
          </Link>
        }
      />
    )
  }
  if (caught.data.status === "noRepo") {
    return (
      <ErrorPage
        title={"404 – Repo not found"}
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
