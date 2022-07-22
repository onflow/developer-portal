import { LoaderFunction } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import findPreset from "~/cms/utils/find-preset.server"
// import findRemotePreset from "~/cms/utils/find-remote-preset.server"

type LoaderData = {}

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<LoaderData> => {
  let sidebarConfig
  sidebarConfig = await findPreset(request.url, "sidebar")

  //   if (!sidebarConfig) {
  //     sidebarConfig = await findRemotePreset(request.url, "sidebar")
  //   }

  return { sidebar: sidebarConfig }
}

export default function RepoDocument() {
  const data = useLoaderData<LoaderData>()
  return (
    <>
      {JSON.stringify(data, null, 2)}
      <Outlet />
    </>
  )
}
