import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { Link, useCatch, useLoaderData, useLocation } from "@remix-run/react"
import { Params } from "react-router"
import invariant from "tiny-invariant"
import { getMdxPage, useMdxComponent } from "~/cms/utils/mdx"
import { ContentSpec, contentTools, getContentSpec } from "~/constants/repos"
import {
  ContentName,
  FirstRoute,
  firstRoutes,
  SecondRoute,
  secondRoutes,
} from "~/constants/repos/contents-structure"
import { ErrorPage } from "~/ui/design-system/src/lib/Components/ErrorPage"
import { getSocialMetas } from "~/utils/seo"
import { MdxPage } from "../../cms"
import { ToolName } from "../../ui/design-system/src/lib/Components/Internal/tools"
import { InternalPage } from "../../ui/design-system/src/lib/Pages/InternalPage"

export { InternalErrorBoundary as ErrorBoundary } from "~/errors/error-boundaries"

export const meta: MetaFunction = ({ parentsData, data, params, location }) => {
  const typedData = data as LoaderData
  if (typedData) {
    return getSocialMetas({
      title: typedData.page.frontmatter.title,
      description: typedData.page.frontmatter.description,
      url: location.toString(),
    })
  }
}

type LoaderData = {
  content: ContentSpec
  path: string
  page: MdxPage
}

type NestedRoute = {
  firstRoute: FirstRoute
  secondRoute: SecondRoute | undefined
  path: string
}

/* TODO: We shouldn't have to manually redirect landing for subfolders without 'index' files */
const customRedirectLanding = (nestedRoute: NestedRoute) => {
  // Redirecting missing "index" pages
  if (nestedRoute.path === "index") {
    if (nestedRoute.firstRoute === "flow" && !nestedRoute.secondRoute) {
      nestedRoute.path = "concepts/index"
    } else if (
      nestedRoute.firstRoute === "flow" &&
      nestedRoute.secondRoute === "faq"
    ) {
      nestedRoute.path = "backers"
    } else if (nestedRoute.firstRoute === "nodes" && !nestedRoute.secondRoute) {
      nestedRoute.path = "node-operation/index"
    } else if (
      nestedRoute.firstRoute === "cadence" &&
      nestedRoute.secondRoute === "language"
    ) {
      nestedRoute.path = "syntax"
    } else if (
      nestedRoute.firstRoute === "tools" &&
      nestedRoute.secondRoute === "flow-emulator"
    ) {
      nestedRoute.path = "overview"
    }
  }
  return nestedRoute
}

const deconstructPath = (params: Params<string>) => {
  const firstRoute = params.repo
  invariant(firstRoute, `expected first route`)

  if (!firstRoutes.includes(firstRoute)) {
    throw json({ status: "noPage" }, { status: 404 })
  }

  const remainingRoute = params["*"]
  var secondRoute = undefined
  var path: string = remainingRoute ?? "index"

  // Check if there is a valid secondRoute
  var second = remainingRoute?.split("/")[0]
  if (second && secondRoutes.includes(second)) {
    secondRoute = second
    path =
      remainingRoute?.split("/")?.slice(1)?.join("/").replace(/\/+$/, "") ||
      "index"
  }

  return customRedirectLanding({ firstRoute, secondRoute, path } as NestedRoute)
}

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<LoaderData> => {
  if (params["*"]?.endsWith("index") && request.url.endsWith("/index")) {
    throw redirect(request.url.replace(/\/index$/, "/"))
  }

  const { firstRoute, secondRoute, path }: NestedRoute = deconstructPath(params)
  const contentSpec = getContentSpec(firstRoute, secondRoute)

  if (!contentSpec) {
    throw json({ status: "noRepo" }, { status: 404 })
  }

  const isDocument =
    !path.includes(".") ||
    path.toLowerCase().endsWith(".md") ||
    path.toLowerCase().endsWith(".mdx")

  if (!isDocument) {
    throw redirect(`/${params.repo}/_raw/${path}`)
  }
  let page: MdxPage | null

  try {
    page = await getMdxPage(
      {
        owner: contentSpec.owner,
        repo: contentSpec.repoName,
        branch: contentSpec.branch,
        fileOrDirPath: [contentSpec.basePath, path].join("/"),
      },
      { request, forceFresh: process.env.FORCE_REFRESH === "true" }
    )
  } catch (e) {
    throw json({ status: "mdxError", error: e }, { status: 500 })
  }

  if (!page) {
    throw json({ status: "noPage" }, { status: 404 })
  }

  return { content: contentSpec, path, page }
}

export default function RepoDocument() {
  const { content, path, page } = useLoaderData<LoaderData>()
  const MDXContent = useMdxComponent(page)
  const tool = contentTools[content.contentName]

  return (
    <InternalPage
      activePath={path}
      contentDisplayName={content.displayName}
      contentPath={content.contentName}
      header={path === "index" ? content.landingHeader : undefined}
      sidebarConfig={content.schema?.sidebar}
      internalSidebarMenu={
        tool && {
          selectedTool: tool,
          toolLinks: toolLinks,
        }
      }
      githubUrl={page.editLink}
      toc={page.toc}
    >
      <MDXContent />
    </InternalPage>
  )
}

const toolContentMap: Record<ToolName, ContentName> = {
  cadence: "cadence",
  cli: "flow-cli",
  emulator: "flow-emulator",
  fcl: "fcl-js",
  testing: "flow-js-testing",
  vscode: "vscode-extension",
}

const toolLinks: Record<ToolName, string> = { ...toolContentMap }
for (let [key, value] of Object.entries(toolLinks)) {
  toolLinks[key as ToolName] =
    value === "cadence" ? `/${value}` : `/tools/${value}`
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
