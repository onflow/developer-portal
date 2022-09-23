import { json, LoaderArgs, redirect } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { join } from "path"
import invariant from "tiny-invariant"
import removeMDorMDXFileExtension from "~/cms/utils/strip-extension"
import {
  DocCollectionInfo,
  DocManifest,
  findDocCollection,
  findDocManifest,
  RemoteRepoError,
} from "../../cms/collections.server"
import { stripTrailingSlashes } from "../../cms/utils/strip-slashes"
import { SIDEBAR_DROPDOWN_MENU } from "../../data/sidebar-dropdown-menu"
import AppLink from "../../ui/design-system/src/lib/Components/AppLink"
import { ErrorPage } from "../../ui/design-system/src/lib/Components/ErrorPage"
import { InternalSidebarUrlContext } from "../../ui/design-system/src/lib/Components/InternalSidebar/InternalSidebarUrlContext"
import { InternalPageContainer } from "../../ui/design-system/src/lib/Pages/InternalPage/InternalPageContainer"
import { ENABLE_PREVIEWS } from "../../utils/env.server"

type LoaderData = Pick<
  NonNullable<DocManifest & DocCollectionInfo>,
  | "collectionRootPath"
  | "displayName"
  | "header"
  | "sidebar"
  | "sidebarRootPath"
  | "source"
> & {
  sidebarDropdownMenu: typeof SIDEBAR_DROPDOWN_MENU
  remoteRepoError?: RemoteRepoError
  preview?: string
}

export const loader = async ({ params, request }: LoaderArgs) => {
  const path = params["*"]

  const url = new URL(request.url)
  const preview =
    (ENABLE_PREVIEWS && url.searchParams.get("preview")) || undefined

  if (path?.endsWith("/")) {
    // For consistency, strip trailing slashes from all URLs.
    return redirect(join("/", stripTrailingSlashes(path)), 302)
  }

  if (path?.endsWith(".md") || path?.endsWith(".mdx")) {
    return redirect(join("/", removeMDorMDXFileExtension(path)), 302)
  }

  if (!path) {
    throw json({ status: "noPage" }, { status: 404 })
  }

  const collection = findDocCollection(path)
  if (!collection) {
    throw json({ status: "noPage" }, { status: 404 })
  }

  const docManifest = await findDocManifest(path, {
    request,
    ref: preview || undefined,
    forceFresh: !!preview,
  })
  invariant(docManifest, `expected manifest`)

  if (docManifest.redirect) {
    return redirect(docManifest.redirect)
  }

  if (docManifest.remoteRepoError) {
    console.log(
      `Remote repository has invalid manifest`,
      `${collection.source.owner}/${collection.source.name}`,
      docManifest.remoteRepoError
    )
  }

  return json<LoaderData>({
    collectionRootPath: collection.collectionRootPath,
    displayName: docManifest.displayName,
    header: docManifest.header,
    preview,
    remoteRepoError: docManifest.remoteRepoError,
    sidebar: docManifest.sidebar,
    sidebarDropdownMenu: SIDEBAR_DROPDOWN_MENU,
    sidebarRootPath: docManifest.sidebarRootPath,
    source: docManifest.source,
  })
}

export default () => {
  const data = useLoaderData<typeof loader>()
  const searchParams = data.preview ? { preview: data.preview } : undefined

  return (
    <InternalSidebarUrlContext.Provider
      value={{
        basePath: data.sidebarRootPath || data.collectionRootPath,
        searchParams,
      }}
    >
      {data.preview && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-cyan-300 text-center text-sm dark:bg-cyan-600 ">
          Previewing:{" "}
          <a
            href={`https://github.com/${data.source.owner}/${data.source.name}/tree/${data.preview}`}
            className="font-bold"
          >
            {data.preview}
          </a>
        </div>
      )}
      {data.remoteRepoError?.type === "RefNotFound" ? (
        <ErrorPage
          title="Preview not found"
          subtitle="The preview requested could not be found"
          actions={null}
        />
      ) : (
        <InternalPageContainer
          additionalBreadrumbs={[
            { href: "/flow", title: "Flow" },
            { href: "/learn", title: "Learn" },
            { href: "/nodes", title: "Nodes" },
            { href: "/tools", title: "Tools" },
          ]}
          collectionDisplayName={data.displayName}
          collectionRootPath={data.collectionRootPath}
          header={data.header}
          sidebarItems={data.sidebar}
          sidebarDropdownMenu={data.sidebarDropdownMenu}
          remoteRepoError={data.remoteRepoError?.message}
        >
          <Outlet />
        </InternalPageContainer>
      )}
    </InternalSidebarUrlContext.Provider>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)
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
}
