import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useCatch, useLoaderData, useLocation } from "@remix-run/react"
import nodePath from "path"
import { MdxPage } from "../../../cms"
import { NotFoundError } from "../../../cms/errors/not-found-error"
import { getMdxPage, useMdxComponent } from "../../../cms/utils/mdx"
import { findCollection } from "../../../constants/collections.server"
import { SIDEBAR_DROPDOWN_MENU } from "../../../constants/sidebar-dropdown-menu"
import AppLink from "../../../ui/design-system/src/lib/Components/AppLink"
import { ErrorPage } from "../../../ui/design-system/src/lib/Components/ErrorPage"
import { InternalUrlContext } from "../../../ui/design-system/src/lib/Components/InternalUrlContext"
import { InternalPageContent } from "../../../ui/design-system/src/lib/Pages/InternalPage/InternalPageContent"
import logger from "../../../utils/logging.server"
import { getSocialMetas } from "../../../utils/seo"

type LoaderData = {
  page: MdxPage
  data: NonNullable<ReturnType<typeof findCollection>>
  pageBasePath: string
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const path = params["*"]

  if (!path) {
    throw json({ status: "noRepo" }, { status: 404 })
  }

  const data = findCollection(path)

  if (!data) {
    throw json({ status: "noRepo" }, { status: 404 })
  }

  try {
    const page = await getMdxPage(
      {
        source: data.source,
        path: data.contentPath,
        isTrusted: true,
      },
      { request, forceFresh: process.env.FORCE_REFRESH === "true" }
    )

    if (!page) {
      throw json({ status: "noPage" }, { status: 404 })
    }

    const path = nodePath.posix.resolve(
      data.collectionRootPath,
      page.origin.relativePath
    )
    const pageBasePath = nodePath.posix.dirname(path) + "/"

    return json({
      data,
      page,
      pageBasePath,
      sidebarDropdownMenu: SIDEBAR_DROPDOWN_MENU,
    })
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw json({ status: "noPage" }, { status: 404 })
    }

    logger.warn(e)

    throw json({ status: "mdxError", error: e }, { status: 500 })
  }
}

export const meta: MetaFunction = ({ data, location }) => {
  const typedData = data as LoaderData
  if (typedData && typedData.page) {
    const title = typedData.page.frontmatter?.title
    const description = typedData.page.frontmatter?.description || ""

    return getSocialMetas({
      title,
      description: description || "Flow Developer Documentation",
      url: location.toString(),
      image: `https://flow-og-image.vercel.app/**${title}**%20${description}.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fstorage.googleapis.com%2Fflow-resources%2Fdocumentation-assets%2Fflow-docs.png&widths=auto&heights=350"`,
    })
  }

  return getSocialMetas({
    title: "Flow Developer Portal",
    url: location.toString(),
  })
}

export default () => {
  const { data, page, pageBasePath } = useLoaderData<LoaderData>()
  const MDXContent = useMdxComponent(page)

  return (
    <InternalUrlContext.Provider value={pageBasePath}>
      <InternalPageContent
        sidebarItems={data.sidebar}
        editPageUrl={page.origin.html_url || undefined}
        toc={page.toc}
      >
        <MDXContent />
      </InternalPageContent>
    </InternalUrlContext.Provider>
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
          title={"404 - Page not found"}
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
          title={"404 - Repo not found"}
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

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)
  return (
    <ErrorPage
      className="p-10"
      title="🙉 Something went wrong."
      subtitle="The site is being repaired. Please check back later."
      actions={
        <AppLink className="underline" to="/">
          Go home
        </AppLink>
      }
    />
  )
}
