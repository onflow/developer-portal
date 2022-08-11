import { json, LoaderFunction, redirect } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { join } from "path"
import { stripTrailingSlahes } from "../../cms/utils/strip-slashes"
import {
  DocCollectionInfo,
  DocManifest,
  findDocCollection,
  findDocManifest,
} from "../../constants/collections.server"
import { SIDEBAR_DROPDOWN_MENU } from "../../constants/sidebar-dropdown-menu"
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
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const path = params["*"]

  if (path?.endsWith("/")) {
    // For consistency, strip trailing slashes from all URLs.
    return redirect(join("/", stripTrailingSlahes(path)), 302)
  }

  if (!path) {
    throw json({ status: "noPage" }, { status: 404 })
  }

  const collection = findDocCollection(path)
  const manifest = await findDocManifest(path)

  if (!manifest || !collection) {
    throw json({ status: "noPage" }, { status: 404 })
  }

  if (manifest.redirect) {
    return redirect(manifest.redirect)
  }

  return json({
    sidebar: manifest.sidebar,
    sidebarRootPath: manifest.sidebarRootPath,
    displayName: manifest.displayName,
    collectionRootPath: collection.collectionRootPath,
    header: manifest.header,
    sidebarDropdownMenu: SIDEBAR_DROPDOWN_MENU,
  })
}

export default () => {
  const data = useLoaderData<LoaderData>()

  return (
    <InternalSidebarUrlContext.Provider
      value={data.sidebarRootPath || data.collectionRootPath}
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
