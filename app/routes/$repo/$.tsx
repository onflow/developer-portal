import { LoaderFunction } from "@remix-run/node"
import { getMdxPage, useMdxComponent } from "~/cms/utils/mdx"
import { json } from "@remix-run/node"
import { Link, useCatch, useLoaderData, useLocation } from "@remix-run/react"
import invariant from "tiny-invariant"
import { ErrorPage } from "~/ui/design-system/src/lib/Components/ErrorPage"
import { InternalToc } from "~/ui/design-system/src/lib/Components/InternalToc"

export const loader: LoaderFunction = async ({ params, request }) => {
  const [repo, fileOrDirPath] = [params["repo"], params["*"] || "index"]
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

export default function () {
  const data = useLoaderData()
  const { code, frontmatter, toc } = data.page
  const MDXContent = useMdxComponent({ code, frontmatter })

  return (
    <div className="pl-[55px]">
      <div className="flex">
        <div className="w-[80%] flex-col">
          <MDXContent />
        </div>
        <div>
          <InternalToc headings={toc} />
        </div>
      </div>
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  console.error("CatchBoundary", caught)
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
