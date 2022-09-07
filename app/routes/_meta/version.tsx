import { useLoaderData } from "@remix-run/react"

export const loader = async () => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    GIT_SHA: process.env.GIT_SHA,
  }
}

export default function Version() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className="prose mx-auto dark:prose-invert">
      <table className="font-mono">
        <tbody>
          <tr>
            <td>server NODE_ENV</td>
            <td>{data.NODE_ENV ?? `(missing)`}</td>
          </tr>
          <tr>
            <td>client NODE_ENV</td>
            <td>{process.env.NODE_ENV ?? `(missing)`}</td>
          </tr>
          <tr>
            <td>GIT_SHA</td>
            <td>{data.GIT_SHA ?? `(missing)`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
