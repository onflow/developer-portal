import { LoaderFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"

export const loader: LoaderFunction = async ({
  params,
  // request,
}): Promise<{}> => {
  return {}
}

export default function () {
  return (
    <div>
      HMMM?
      <Outlet />
    </div>
  )
}
