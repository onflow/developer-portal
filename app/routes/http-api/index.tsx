import { useLoaderData } from "@remix-run/react"
import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { RedocStandalone } from "redoc"

export const meta: MetaFunction = () => {
  return {
    description: "Open API documentation for the Flow Access Node HTTP API.",
    "twitter:handle": "flow_blockchain",
    "twitter:url": "https://twitter.com/flow_blockchain",
  }
}

export const loader: LoaderFunction = () => {
  return { process: { env: {} } }
}

export default function Page() {
  const data = useLoaderData()

  return (
    <div>
      <RedocStandalone
        options={{
          scrollYOffset: 101,
          nativeScrollbars: true,
        }}
        specUrl="https://raw.githubusercontent.com/onflow/flow/master/openapi/access.yaml"
      />
    </div>
  )
}
