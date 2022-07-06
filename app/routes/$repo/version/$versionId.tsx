import { LoaderFunction } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"

export const loader: LoaderFunction = ({ params }) => {
  return {
    version: params.versionId,
  }
}

export default function Version() {
  const data = useLoaderData()
  return (
    <div>
      <pre>$versionid.tsx: {data.version}</pre>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
