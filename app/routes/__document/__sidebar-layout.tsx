import { LoaderFunction } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import findPreset from "~/cms/utils/find-preset.server"

type LoaderData = {}

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<LoaderData> => {
  const sidebarConfig = await findPreset(request.url, "sidebar")
  return { sidebarConfig }
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
