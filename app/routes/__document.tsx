import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import { Outlet, useCatch, useLoaderData, useLocation } from "@remix-run/react"
import { getMdxPage } from "~/cms/utils/mdx"
import { MdxPage } from "~/cms"
import { ErrorPage } from "~/ui/design-system/src/lib/Components/ErrorPage"
import { getSocialMetas } from "~/utils/seo"
import AppLink from "~/ui/design-system/src/lib/Components/AppLink"

import { json } from "@remix-run/node"
import contentRepos, {
  DEFAULT_CONTENT_PATH,
  DEFAULT_REPO_OWNER,
} from "~/cms/content-repos"

export { InternalErrorBoundary as ErrorBoundary } from "~/errors/error-boundaries"

export const meta: MetaFunction = ({ data, location }) => {
  const typedData = data
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
  path: string
  page: MdxPage | null
}

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<LoaderData> => {
  if (!params.repo || !contentRepos[params.repo]) {
    throw json({ status: "noRepo" }, { status: 404 })
  }

  if (params["*"]?.endsWith("index") && request.url.endsWith("/index")) {
    throw redirect(request.url.replace(/\/index$/, "/"))
  }

  const path = params["*"]!

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
        owner: contentRepos[params.repo]?.owner || DEFAULT_REPO_OWNER,
        repo: params.repo,
        branch: contentRepos[params.repo]?.branch || "master",
        fileOrDirPath:
          contentRepos[params.repo]?.contentPath || DEFAULT_CONTENT_PATH,
        isTrusted: true,
      },
      { request, forceFresh: process.env.FORCE_REFRESH === "true" }
    )
  } catch (e) {
    throw json({ status: "mdxError", error: e }, { status: 500 })
  }

  return { path, page }
}

//const contentSpec = getContentSpec(params.repo!, path)

// if (!contentSpec) {
//   throw json({ status: "noRepo" }, { status: 404 })
// }

// let page: MdxPage | null

// try {
//   page = await getMdxPage(
//     {
//       owner: contentSpec.owner,
//       repo: contentSpec.repoName,
//       branch: contentSpec.branch,
//       fileOrDirPath: [contentSpec.basePath, path].join("/"),
//       isTrusted: contentSpec.isTrusted,
//     },
//     { request, forceFresh: process.env.FORCE_REFRESH === "true" }
//   )
// } catch (e) {
//   throw json({ status: "mdxError", error: e }, { status: 500 })
// }

// if (!page) {
//   throw json({ status: "noPage" }, { status: 404 })
// }

export default function RepoDocument() {
  const { page } = useLoaderData<LoaderData>()

  // const isSwitchContent = Object.keys(switchContents).includes(
  //   content.contentName
  // )

  return (
    <Outlet context={{ mdx: page }} />
    // <InternalPage
    //   activePath={path}
    //   contentDisplayName={content.displayName}
    //   contentPath={content.contentName}
    //   header={path === "index" ? content.landingHeader : undefined}
    //   sidebarConfig={content.schema?.sidebar}
    //   internalSidebarMenu={
    //     isSwitchContent
    //       ? {
    //           selected: content.contentName as SwitchContentName,
    //         }
    //       : undefined
    //   }
    //   githubUrl={page.editLink}
    //   toc={page.toc}
    // >
    //   <MDXContent />
    // </InternalPage>
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
