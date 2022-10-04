import { LoaderArgs } from "@remix-run/node"
import { fileTypeFromBuffer } from "file-type"
import mime from "mime-types"
import { findDocCollection } from "../../cms/collections.server"
import { downloadFileFromSource } from "../../cms/doc-collections/download-file-from-source"
import { NotFoundError } from "../../cms/errors/not-found-error"
import { ENABLE_PREVIEWS } from "../../utils/env.server"

export const loader = async ({ params, request }: LoaderArgs) => {
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

  const url = new URL(request.url)
  const preview =
    (ENABLE_PREVIEWS && url.searchParams.get("preview")) || undefined

  try {
    // TODO: cache this!
    const buffer = await downloadFileFromSource(
      {
        ...contentSpec.source,
        branch: preview || contentSpec.source.branch,
      },
      contentSpec.contentPath
    )

    // First try looking up the mime type based on the file extension
    let mimeType = mime.lookup(path)

    if (!mimeType) {
      // if lookup by extension files, try to determine the mime type
      // from the actual file content.
      // (prefer mime.lookup because `fileTypeFromBuffer` is meant primarily
      // for binary data and can return an undesired mime type for things
      // like SVGs)
      const type = await fileTypeFromBuffer(buffer)
      if (type) {
        mimeType = type.mime
      }
    }

    if (!mimeType) {
      throw new Response(`Unknown file type`, { status: 400 })
    }

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "max-age=600",
      },
    })
  } catch (error: any) {
    if (error instanceof NotFoundError) {
      throw new Response(error.message, { status: 404 })
    }

    throw error
  }
}
