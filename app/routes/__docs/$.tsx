import { json, LoaderFunction, redirect } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { join } from "path"
import { stripTrailingSlahes } from "../../cms/utils/strip-slashes"
import removeMDorMDXFileExtension from "../../cms/utils/strip-extension"
import { findCollection } from "../../constants/collections.server"
import { SIDEBAR_DROPDOWN_MENU } from "../../constants/sidebar-dropdown-menu"
import AppLink from "../../ui/design-system/src/lib/Components/AppLink"
import { ErrorPage } from "../../ui/design-system/src/lib/Components/ErrorPage"
import { InternalSidebarUrlContext } from "../../ui/design-system/src/lib/Components/InternalSidebar/InternalSidebarUrlContext"
import { InternalPageContainer } from "../../ui/design-system/src/lib/Pages/InternalPage/InternalPageContainer"

type LoaderData = Pick<
  NonNullable<ReturnType<typeof findCollection>>,
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

  if (path?.endsWith("md") || path?.endsWith("mdx")) {
    return redirect(join("/", removeMDorMDXFileExtension(path)), 302)
  }

  if (!path) {
    throw json({ status: "noPage" }, { status: 404 })
  }


  const data = findCollection(path)

  if (!data) {
    throw json({ status: "noPage" }, { status: 404 })
  }

  if (data.redirect) {
    return redirect(data.redirect)
  }

  return json({
    sidebar: data.sidebar,
    sidebarRootPath: data.sidebarRootPath,
    displayName: data.displayName,
    collectionRootPath: data.collectionRootPath,
    header: data.header,
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
