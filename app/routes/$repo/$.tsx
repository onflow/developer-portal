import { useEffect, useState } from "react"
import { LoaderFunction } from "@remix-run/node"
import { getMdxPage, useMdxComponent } from "~/cms/utils/mdx"
import { json } from "@remix-run/node"
import { Link, useCatch, useLoaderData, useLocation } from "@remix-run/react"
import invariant from "tiny-invariant"
import { ErrorPage } from "~/ui/design-system/src/lib/Components/ErrorPage"
import { isFlowContent } from "~/constants/repos"
import { InternalToc } from "~/ui/design-system/src/lib/Components/InternalToc"
export { InternalErrorBoundary as ErrorBoundary } from "~/errors/error-boundaries"

export const loader: LoaderFunction = async ({ params, request }) => {
  const content = params["repo"]!
  const repo = isFlowContent(content) ? "flow" : content
  const pathParams = params["*"] || "index"
  const fileOrDirPath = isFlowContent(content)
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
    throw json({ status: "mdxError", error: e }, { status: 500 })
  }

  if (!page) {
    throw json({ status: "noPage" }, { status: 404 })
  }

  return {
    page,
  }
}

export default function RepoDocument() {
  const data = useLoaderData()
  const location = useLocation()
  const { code, frontmatter, toc } = data.page
  const MDXContent = useMdxComponent({ code, frontmatter })

  const [currentHash, setHash] = useState("")

  useEffect(() => {
    setHash(location.hash)
  }, [location.hash])

  return (
    <div className="pl-[55px]">
      <div className="grid grid-cols-5">
        <div className="col-span-4 pt-8">
          <MDXContent />
        </div>
        <div className="pt-[55px]">
          {toc != null ? (
            <InternalToc
              headings={toc}
              currentHash={currentHash}
              updateHash={(e) => setHash("#test")}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  console.error("CatchBoundary $.tsx", caught)
  const location = useLocation()

  switch (caught.data.status) {
    case "noPage":
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
    case "mdxError":
      return (
        <ErrorPage
          title={"Error processing"}
          subtitle={`An error occured processing the mdx for this document`}
          actions={
            <Link className="underline" to="/">
              Go home
            </Link>
          }
        />
      )
    case "noRepo":
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
