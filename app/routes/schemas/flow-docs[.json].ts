import { json } from "@remix-run/node"
import schema from "~/data/doc-collection-manifest-schema.json"

export const loader = async () => {
  return json(schema, {
    status: 200,
    headers: {
      "Cache-Control": "max-age=60",
    },
  })
}
