import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { useCatch, useLoaderData, useLocation } from "@remix-run/react"
import { Params } from "react-router"
import invariant from "tiny-invariant"
import { getMdxPage, useMdxComponent } from "~/cms/utils/mdx"
import { ContentSpec, getContentSpec } from "~/constants/repos"
import {
  FirstRoute,
  isFirstRoute,
  isSecondRoute,
  SecondRoute,
} from "~/constants/repos/contents-structure"
import { ErrorPage } from "~/ui/design-system/src/lib/Components/ErrorPage"
import { getSocialMetas } from "~/utils/seo"
import { MdxPage } from "../../cms"
import { InternalPage } from "../../ui/design-system/src/lib/Pages/InternalPage"
import AppLink from "~/ui/design-system/src/lib/Components/AppLink"
import {
  SwitchContentName,
  switchContents,
} from "~/ui/design-system/src/lib/Components/Internal/switchContent"

export { InternalErrorBoundary as ErrorBoundary } from "~/errors/error-boundaries"

// @ts-ignore
export const meta: MetaFunction = ({ data, location }) => {
  const typedData = data as LoaderData
  if (typedData && typedData.page) {
    return getSocialMetas({
      title: typedData.page.frontmatter?.title,
      description: typedData.page.frontmatter?.description,
      url: location.toString(),
    })
  }

  return {}
}

type LoaderData = {
  content: ContentSpec
  path: string
  page: MdxPage
}

type NestedRoute = {
  firstRoute: FirstRoute
  secondRoute: SecondRoute
  path: string
}

/* TODO: We shouldn't have to manually redirect landing for subfolders without 'index' files */
const customRedirectLanding = (nestedRoute: NestedRoute) => {
  // Redirecting missing "index" pages
  if (nestedRoute.path === "index") {
    if (nestedRoute.firstRoute === "flow" && !nestedRoute.secondRoute) {
      nestedRoute.path = "dapp-development/index"
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
      nestedRoute.firstRoute === "cadence" &&
      nestedRoute.secondRoute === "tutorial"
    ) {
      nestedRoute.path = "01-first-steps"
    }
  }
  return nestedRoute
}

export const deconstructPath = (params: Params<string>): NestedRoute => {
  const firstRoute = params.repo
  invariant(firstRoute, `expected first route`)

  if (!isFirstRoute(firstRoute)) {
    throw json({ status: "noPage" }, { status: 404 })
  }

  const remainingRoute = params["*"]
  var secondRoute = undefined
  var path: string = remainingRoute ?? "index"

  // Check if there is a valid secondRoute
  var second = remainingRoute?.split("/")[0]
  if (second && isSecondRoute(second)) {
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
    throw redirect(`/raw/${params.repo}/${params["*"]}`)
  }

  let page: MdxPage | null

  try {
    page = await getMdxPage(
      {
        owner: contentSpec.owner,
        repo: contentSpec.repoName,
        branch: contentSpec.branch,
        fileOrDirPath: [contentSpec.basePath, path].join("/"),
        isTrusted: contentSpec.isTrusted,
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

  // Tools live at top-level URLs like /fcl-js so they will never be nested
  // under /flow/fcl-js so ... since this is a catch-all route (TODO: refactor to use remix routes)
  //
  // Logically a tool is NOT included in the list of flow routes (routes with the parent /flow)
  // const tool = ![...ROUTING_STRUCTURE.flow].includes(content.contentName)
  const isSwitchContent = Object.keys(switchContents).includes(
    content.contentName
  )

  return (
    <InternalPage
      activePath={path}
      contentDisplayName={content.displayName}
      contentPath={content.contentName}
      header={path === "index" ? content.landingHeader : undefined}
      sidebarConfig={content.schema?.sidebar}
      internalSidebarMenu={
        isSwitchContent
          ? {
              selected: content.contentName as SwitchContentName,
            }
          : undefined
      }
      githubUrl={page.editLink}
      toc={page.toc}
    >
      <MDXContent />
    </InternalPage>
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
            <AppLink className="underline" to="/">
              Go home
            </AppLink>
          }
        />
      )
    case "mdxError":
      return (
        <ErrorPage
          title={"🙉 Something went wrong."}
          subtitle={`The site is being repaired. Please check back later.`}
          actions={
            <AppLink className="underline" to="/">
              Go home
            </AppLink>
          }
        />
      )
    case "noRepo":
      return (
        <ErrorPage
          title={"404 – Repo not found"}
          subtitle={`This repo is not available or does not exist`}
          actions={
            <AppLink className="underline" to="/">
              Go home
            </AppLink>
          }
        />
      )
  }

  throw new Error(`Unhandled error: ${caught.status}`)
}
