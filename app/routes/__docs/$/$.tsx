import {
  HtmlMetaDescriptor,
  json,
  LinkDescriptor,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node"
import { useCatch, useLoaderData, useLocation } from "@remix-run/react"
import nodePath from "path"
import { DynamicLinksFunction } from "remix-utils"
import { SidebarItemList } from "~/ui/design-system/src/lib/Components/InternalSidebar"
import { MdxPage } from "../../../cms"
import {
  findDocCollection,
  findDocManifest,
} from "../../../cms/collections.server"
import { NotFoundError } from "../../../cms/errors/not-found-error"
import { getMdxPage, useMdxComponent } from "../../../cms/utils/mdx"
import AppLink from "../../../ui/design-system/src/lib/Components/AppLink"
import { ErrorPage } from "../../../ui/design-system/src/lib/Components/ErrorPage"
import { InternalUrlContext } from "../../../ui/design-system/src/lib/Components/InternalUrlContext"
import { InternalPageContent } from "../../../ui/design-system/src/lib/Pages/InternalPage/InternalPageContent"
import { ENABLE_PREVIEWS } from "../../../utils/env.server"
import logger from "../../../utils/logging.server"
import {
  getCanonicalLinkDescriptor,
  getSocialMetas,
} from "../../../utils/seo.server"

export const handle: {
  dynamicLinks: DynamicLinksFunction<LoaderData>
} = { dynamicLinks: ({ data }) => data?.links || [] }

export const meta: MetaFunction = ({ data }: { data: LoaderData }) =>
  data?.meta || {}

type LoaderData = {
  links: LinkDescriptor[]
  meta: HtmlMetaDescriptor
  page: MdxPage
  preview?: string
  resolvedPath: string
  sidebar: SidebarItemList | undefined
  url: string
}

export const loader = async ({ params, request }: LoaderArgs) => {
  let path = params["*"]

  const url = new URL(request.url)
  const preview =
    (ENABLE_PREVIEWS && url.searchParams.get("preview")) || undefined

  if (!path) {
    throw json({ status: "noRepo" }, { status: 404 })
  }

  const data = findDocCollection(path)
  const manifest = await findDocManifest(path, {
    request,
    ref: preview || undefined,
  })

  if (!data || !manifest) {
    throw json({ status: "noRepo" }, { status: 404 })
  }

  try {
    const page = await getMdxPage(
      {
        source: {
          ...data.source,
          branch: preview || data.source.branch,
        },
        path: data.contentPath,
      },
      { request, forceFresh: process.env.FORCE_REFRESH === "true" || !!preview }
    )

    if (!page) {
      throw new NotFoundError("")
    }

    const parsedPath = nodePath.posix.parse(page.origin.relativePath)

    // This removes the extension (`name` is the filename without extension)
    const relativePath = nodePath.posix.join(parsedPath.dir, parsedPath.name)

    const resolvedPath = nodePath.posix.resolve(
      data.collectionRootPath,
      relativePath
    )

    const title = page.frontmatter?.title || "Flow Developer Documentation"
    const description =
      page.frontmatter?.description || "Flow Developer Documentation"

    return json<LoaderData>({
      links: preview ? [] : [getCanonicalLinkDescriptor(resolvedPath)],
      meta: getSocialMetas({
        title,
        description,
        url: request.url,
        image: `https://flow-og-image.vercel.app/**${title}**%20${description}.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fstorage.googleapis.com%2Fflow-resources%2Fdocumentation-assets%2Fflow-docs.png&widths=auto&heights=350"`,
      }),
      page,
      resolvedPath,
      sidebar: manifest.sidebar,
      url: request.url,
      preview,
    })
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw json({ status: "noPage" }, { status: 404 })
    }

    logger.warn(e)

    throw json({ status: "mdxError", error: e }, { status: 500 })
  }
}

export default () => {
  const { sidebar, page, resolvedPath, preview } =
    useLoaderData<typeof loader>()
  const searchParams = preview ? { preview } : undefined

  const MDXContent = useMdxComponent(page)

  return (
    <InternalUrlContext.Provider
      value={{ basePath: resolvedPath, searchParams }}
    >
      <InternalPageContent
        sidebarItems={sidebar}
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
