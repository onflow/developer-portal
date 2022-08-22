import schema from "~/constants/doc-collection-manifest-schema.json"
import { json, LoaderFunction } from "@remix-run/node"

export const loader: LoaderFunction = async ({ request }) => {
  return json(schema, {
    status: 200,
    headers: {
      "Cache-Control": "max-age=60",
    },
  })
}
