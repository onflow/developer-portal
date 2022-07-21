import { LoaderFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"

type LoaderData = {}

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<LoaderData> => {
  return {}
}

export default function RepoDocument() {
  return (
    <>
      SIDEBAR
      <Outlet />
    </>
  )
}
