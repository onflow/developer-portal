import type { DocCollectionSource } from "~/constants/doc-collections.server"

export const getCompiledKey = (source: DocCollectionSource, path: string) =>
  `${source.owner}:${source.name}:${source.branch}:${source.rootPath}:${path}:compiled`

export const getDownloadKey = (
  source: DocCollectionSource,
  fileOrDirPath: string
) =>
  `${source.owner}:${source.name}:${source.branch}:${source.rootPath}:${fileOrDirPath}:downloaded`
