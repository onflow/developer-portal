import { json } from "@remix-run/node"
import invariant from "tiny-invariant"
import { getMdxPage } from "~/cms/utils/mdx"
import { ContentSpec } from "~/constants/repos"
import { MdxPage } from "./compile.mdx.server"
import { getRepoVersions, VersionList } from "./versions.server"
export { InternalErrorBoundary as ErrorBoundary } from "~/errors/error-boundaries"

export type InternalPageLoaderData = {
  content: ContentSpec
  path: string
  page: MdxPage
} & (
  | {
      versions: VersionList
      selectedVersion: string
    }
  | { versions?: undefined; selectedVersion?: undefined }
)

export const internalPageLoader = async ({
  contentSpec,
  shortPath,
  fullPath,
  request,
  version,
}: {
  contentSpec: ContentSpec
  shortPath: string
  fullPath: string
  request: Request
  version?: string
}): Promise<InternalPageLoaderData> => {
  let page: MdxPage | null

  try {
    page = await getMdxPage(
      {
        owner: contentSpec.owner,
        repo: contentSpec.repoName,
        branch: contentSpec.branch,
        fileOrDirPath: fullPath,
      },
      { request, forceFresh: process.env.FORCE_REFRESH === "true" }
    )
  } catch (e) {
    throw json({ status: "mdxError", error: e }, { status: 500 })
  }

  if (!page) {
    throw json({ status: "noPage" }, { status: 404 })
  }

  // todo: cache this?
  const { versions, error } = await getRepoVersions(
    contentSpec.owner,
    contentSpec.repoName
  )

  if (error) {
    console.error(
      `Issue loading versions.json for ${contentSpec.owner}/${contentSpec.repoName}: ${error}`
    )
  }

  if (versions != null) {
    const defaultSelected = versions[0]
    invariant(defaultSelected, `expected a version`)

    let selectedVersion = versions.find((v) => v === version) ?? defaultSelected

    return {
      content: contentSpec,
      path: shortPath,
      page,
      versions: versions,
      selectedVersion: selectedVersion,
    }
  } else {
    return {
      content: contentSpec,
      path: shortPath,
      page,
    }
  }
}

export function isPathDocument(path: string) {
  return (
    !path.includes(".") ||
    path.toLowerCase().endsWith(".md") ||
    path.toLowerCase().endsWith(".mdx")
  )
}
