import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useCatch, useLocation } from "@remix-run/react"
// import { getMdxPage, useMdxComponent } from "~/cms/utils/mdx"
// import { ContentSpec } from "~/cms/schema"
import { ErrorPage } from "~/ui/design-system/src/lib/Components/ErrorPage"
import { getSocialMetas } from "~/utils/seo"
// import { MdxPage } from "../../cms"
// import { InternalPage } from "../../ui/design-system/src/lib/Pages/InternalPage"
import AppLink from "~/ui/design-system/src/lib/Components/AppLink"
// import {
//   SwitchContentName,
//   switchContents,
// } from "~/ui/design-system/src/lib/Components/Internal/switchContent"

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
  // content: ContentSpec
  // path: string
  // page: MdxPage
}

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<LoaderData> => {
  // if (params["*"]?.endsWith("index") && request.url.endsWith("/index")) {
  //   throw redirect(request.url.replace(/\/index$/, "/"))
  // }

  // const path = params["*"]!
  // const contentSpec = getContentSpec(params.repo!, path)

  // if (!contentSpec) {
  //   throw json({ status: "noRepo" }, { status: 404 })
  // }

  // const isDocument =
  //   !path.includes(".") ||
  //   path.toLowerCase().endsWith(".md") ||
  //   path.toLowerCase().endsWith(".mdx")

  // if (!isDocument) {
  //   throw redirect(`/raw/${params.repo}/${params["*"]}`)
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

  // return { content: contentSpec, path, page }
  return {}
}

export default function RepoDocument() {
  // const { content, path, page } = useLoaderData<LoaderData>()
  // const MDXContent = useMdxComponent(page)

  // // Tools live at top-level URLs like /fcl-js so they will never be nested
  // // under /flow/fcl-js so ... since this is a catch-all route (TODO: refactor to use remix routes)
  // //
  // // Logically a tool is NOT included in the list of flow routes (routes with the parent /flow)
  // // const tool = ![...ROUTING_STRUCTURE.flow].includes(content.contentName)
  // const isSwitchContent = Object.keys(switchContents).includes(
  //   content.contentName
  // )

  return <>Test</>
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
