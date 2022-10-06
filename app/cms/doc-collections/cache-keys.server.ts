import type { DocCollectionSource } from "~/cms/doc-collections/types"
import { FetchDirectoryContentOptions } from "../github/fetch-directory-content"

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

export const directoryListKey = ({
  owner,
  repo,
  ref,
  path,
}: FetchDirectoryContentOptions) =>
  `github-dir-list:${owner}:${repo}:${ref}:${path}`
