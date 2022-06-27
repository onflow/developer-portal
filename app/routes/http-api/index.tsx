import { MetaFunction } from "@remix-run/node"
import { RedocYep } from "~/components/redoc"

export const meta: MetaFunction = () => {
  return {
    description: "Open API documentation for the Flow Access Node HTTP API.",
    "twitter:handle": "flow_blockchain",
    "twitter:url": "https://twitter.com/flow_blockchain",
  }
}

export default function Page() {
  return (
    <div>
      <RedocYep />
    </div>
  )
}
