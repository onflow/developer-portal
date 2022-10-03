import type { DocCollectionSource } from "~/cms/doc-collections/types"

export const documentCompiledKey = (
  source: DocCollectionSource,
  path: string
) =>
  `${source.owner}:${source.name}:${source.branch}:${source.rootPath}:${path}:compiled`

export const documentDownloadKey = (
  source: DocCollectionSource,
  fileOrDirPath: string
) =>
  `${source.owner}:${source.name}:${source.branch}:${source.rootPath}:${fileOrDirPath}:downloaded`
