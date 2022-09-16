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
} from "../../cms/collections.server"
import { stripTrailingSlashes } from "../../cms/utils/strip-slashes"
import { SIDEBAR_DROPDOWN_MENU } from "../../data/sidebar-dropdown-menu"
import AppLink from "../../ui/design-system/src/lib/Components/AppLink"
import { ErrorPage } from "../../ui/design-system/src/lib/Components/ErrorPage"
import { InternalSidebarUrlContext } from "../../ui/design-system/src/lib/Components/InternalSidebar/InternalSidebarUrlContext"
import { InternalPageContainer } from "../../ui/design-system/src/lib/Pages/InternalPage/InternalPageContainer"

type LoaderData = Pick<
  NonNullable<DocManifest & DocCollectionInfo>,
  | "sidebar"
  | "sidebarRootPath"
  | "displayName"
  | "collectionRootPath"
  | "header"
> & {
  sidebarDropdownMenu: typeof SIDEBAR_DROPDOWN_MENU
  remoteRepoError?: string
}

export const loader = async ({ params, request }: LoaderArgs) => {
  const path = params["*"]

  if (path?.endsWith("/")) {
    // For consistency, strip trailing slashes from all URLs.
    return redirect(join("/", stripTrailingSlashes(path)), 302)
  }

  if (path?.endsWith("md") || path?.endsWith("mdx")) {
    return redirect(join("/", removeMDorMDXFileExtension(path)), 302)
  }

  if (!path) {
    throw json({ status: "noPage" }, { status: 404 })
  }

  const collection = findDocCollection(path)
  if (!collection) {
    throw json({ status: "noPage" }, { status: 404 })
  }

  const docManifest = await findDocManifest(path, { request })
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
    sidebar: docManifest.sidebar,
    sidebarRootPath: docManifest.sidebarRootPath,
    displayName: docManifest.displayName,
    collectionRootPath: collection.collectionRootPath,
    header: docManifest.header,
    sidebarDropdownMenu: SIDEBAR_DROPDOWN_MENU,
    remoteRepoError:
      process.env.NODE_ENV === "development"
        ? docManifest.remoteRepoError
        : undefined,
  })
}

export default () => {
  const data = useLoaderData<typeof loader>()

  return (
    <InternalSidebarUrlContext.Provider
      value={{ basePath: data.sidebarRootPath || data.collectionRootPath }}
    >
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
        remoteRepoError={data.remoteRepoError}
      >
        <Outlet />
      </InternalPageContainer>
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
