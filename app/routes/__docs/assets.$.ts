import { LoaderFunction } from "@remix-run/node"
import { fileTypeFromBuffer } from "file-type"
import { downloadFileByPath } from "~/cms"
import { NotFoundError } from "../../cms/errors/not-found-error"
import { findDocCollection } from "../../constants/collections.server"

export const loader: LoaderFunction = async ({ params }) => {
  const path = params["*"]

  if (!path) {
    throw new Response("No path specified", {
      status: 400,
    })
  }

  const contentSpec = findDocCollection(path)
  if (!contentSpec) {
    throw new Response("Collection not Found", {
      status: 404,
    })
  }

  try {
    // TODO: cache this!
    const buffer = await downloadFileByPath(
      contentSpec.source,
      contentSpec.contentPath
    )
    const type = await fileTypeFromBuffer(buffer)

    if (!type) {
      throw new Response(`Unknown file type`, { status: 400 })
    }

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": type.mime,
        "Cache-Control": "max-age=300",
      },
    })
  } catch (error: any) {
    if (error instanceof NotFoundError) {
      throw new Response(error.message, { status: 404 })
    }

    throw error
  }
}
