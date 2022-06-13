// import { InternalSidebar } from "@flow-docs/ui";
import type { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData, useCatch } from "@remix-run/react"
import { json } from "@remix-run/node"
import { getMdxPage, useMdxComponent } from "~/cms/utils/mdx"

// import { TEMP_SIDEBAR_CONFIG } from "@flow-docs/ui";

// TODO: MAP REPO TO INFO ARCH: EG "fcl-js repo" should redirect to '/sdks/fcl' ... etc
// might add this repo mapping to json resource endpoint
// TODO: Allow specifying a specific branch, ideally dynamically (from publisher-land)
// ... but we can hardcode  master / main for MVP
const repos = ["cadence", "fcl-js", "mock-developer-doc"]

const validRepo = (repo: string | undefined) => {
  return repos.includes(repo!)
}

export const meta: MetaFunction = () => {
  return { title: "" }
}

export const loader: LoaderFunction = async ({ params, request }) => {
  // Here we forward the request if the first URL segemnt does
  // not match a repo we know about ...

  // TODO: make this redirect to appropriate section for repo
  // If no approapriate section, then fall through and try to get content
  // for the repo ... otherwise return Response and handle down the chain?
  if (!params["repo"] || !validRepo(params["repo"])) {
    return new Response()
  }

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
    throw json({ noPage: true }, { status: 500 })
  }

  if (!page) {
    throw json({ noPage: true }, { status: 404 })
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
  if (caught.data.noPage) {
    return <div>No Page</div>
  }
  throw new Error(`Unhandled error: ${caught.status}`)
}
