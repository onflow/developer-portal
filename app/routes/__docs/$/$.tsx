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
import { InternaSidebarDropdownMenuGroup } from "../../../ui/design-system/src/lib/Components/InternalSidebarDropdownMenu"
import { InternalUrlContext } from "../../../ui/design-system/src/lib/Components/InternalUrlContext"
import { InternalPage } from "../../../ui/design-system/src/lib/Pages/InternalPage"
import logger from "../../../utils/logging.server"
import { getSocialMetas } from "../../../utils/seo"

type LoaderData = {
  page: MdxPage
  data: NonNullable<ReturnType<typeof findCollection>>
  pageBasePath: string
  sidebarDropdownMenu: InternaSidebarDropdownMenuGroup[]
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
    return getSocialMetas({
      title: typedData.page.frontmatter?.title,
      description: typedData.page.frontmatter?.description,
      url: location.toString(),
    })
  }

  return {}
}

export default () => {
  const { data, page, pageBasePath, sidebarDropdownMenu } =
    useLoaderData<LoaderData>()
  const MDXContent = useMdxComponent(page)

  // TODO: extract sidebarDropdownMenu and put in "constants" or somehwere
  // alongside the doc collection definitions?

  return (
    <InternalUrlContext.Provider value={pageBasePath}>
      <InternalPage
        collectionDisplayName={data.displayName}
        collectionRootPath={data.collectionRootPath}
        header={data.header}
        sidebarItems={data.sidebar}
        sidebarDropdownMenu={sidebarDropdownMenu}
        editPageUrl={page.origin.html_url || undefined}
        toc={page.toc}
      >
        <MDXContent />
      </InternalPage>
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
