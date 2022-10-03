import { DocCollectionSource } from "./types"
import { posix } from "node:path"
import { downloadFile } from "../github/download-file"

/**
 * Downloads a file from a DocCollectionSource at the given (relative) path
 */
export async function downloadFileFromSource(
  source: DocCollectionSource,
  path: string
) {
  const resolvedPath = posix.join(source.rootPath, path)

  return downloadFile({
    owner: source.owner,
    repo: source.name,
    ref: source.branch,
    path: resolvedPath,
  })
}
