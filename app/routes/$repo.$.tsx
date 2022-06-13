// import { InternalSidebar } from "@flow-docs/ui";
import type { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData, useCatch, Link, useLocation } from "@remix-run/react"
import { json } from "@remix-run/node"
import { getMdxPage, useMdxComponent } from "~/cms/utils/mdx"
import { ErrorPage } from "~/ui/design-system/src/lib/Components/ErrorPage"
import invariant from "tiny-invariant"

// import { TEMP_SIDEBAR_CONFIG } from "@flow-docs/ui";

// TODO: MAP REPO TO INFO ARCH: EG "fcl-js repo" should redirect to '/sdks/fcl' ... etc
// might add this repo mapping to json resource endpoint
// TODO: Allow specifying a specific branch, ideally dynamically (from publisher-land)
// ... but we can hardcode  master / main for MVP
const repos = [
  "flow",
  "cadence",
  "flow-cli",
  "flow-js-testing",
  "flow-go-sdk",
  "fcl-js",
  "flow-emulator",
  "flow-cadut",
  "mock-developer-doc",
]

const validRepo = (repo: string | undefined) => {
  return repos.includes(repo!)
}

export const meta: MetaFunction = () => {
  return { title: "" }
}

export const loader: LoaderFunction = async ({ params, request }) => {
  // Here we forward the request if the first URL segemnt does
  // not match a repo we know about ...

  if (!validRepo(params["repo"])) {
    throw json({ status: "noRepo" }, { status: 404 })
  }

  // TODO: make this redirect to appropriate section for repo
  // If no approapriate section, then fall through and try to get content
  // for the repo ... otherwise return Response and handle down the chain?
  // if (!params["repo"] || !validRepo(params["repo"])) {
  //   return new Response()
  // }
  invariant(params["repo"], `expected repo param`)

  const [repo, fileOrDirPath] = [params["repo"], params["*"] || "index"]

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
