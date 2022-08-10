import { join } from "path"
import { json, LoaderFunction, redirect } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { stripTrailingSlahes } from "../../cms/utils/strip-slashes"
import { findCollection } from "../../constants/collections.server"
import { SidebarItem } from "../../ui/design-system/src/lib/Components/InternalSidebar"
import { InternalSidebarUrlContext } from "../../ui/design-system/src/lib/Components/InternalSidebar/InternalSidebarUrlContext"

type LoaderData = {
  sidebar: SidebarItem[]
  sidebarRootPath: string
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

  const data = findCollection(path)

  if (!data) {
    throw json({ status: "noPage" }, { status: 404 })
  }

  if (data.redirect) {
    return redirect(data.redirect)
  }

  return json({
    sidebar: data.sidebar,
    sidebarRootPath: data.sidebarRootPath ?? data.collectionRootPath,
  })
}

export default () => {
  const { sidebarRootPath } = useLoaderData<LoaderData>()

  // TODO: Render the outer page layout and sidebar here. This way we can
  // still render a shell and sidebar even if we fail to fetch the page content.
  return (
    <InternalSidebarUrlContext.Provider value={sidebarRootPath}>
      <Outlet />
    </InternalSidebarUrlContext.Provider>
  )
}
