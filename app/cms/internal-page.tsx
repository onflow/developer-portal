import { json } from "@remix-run/node"
import { getMdxPage } from "~/cms/utils/mdx"
import { ContentSpec } from "~/constants/repos"
import { MdxPage } from "./compile.mdx.server"
export { InternalErrorBoundary as ErrorBoundary } from "~/errors/error-boundaries"

export type InternalPageLoaderData = {
  content: ContentSpec
  path: string
  page: MdxPage
} & (
  | {
      versions: Array<string>
      selectedVersion: string
    }
  | { versions?: undefined; selectedVersion?: undefined }
)

export const internalPageLoader = async ({
  contentSpec,
  shortPath,
  fullPath,
  request,
}: {
  contentSpec: ContentSpec
  shortPath: string
  fullPath: string
  request: Request
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

  return {
    content: contentSpec,
    path: shortPath,
    page,
    versions: ["latest", "2.0.0", "1.1.0"],
    selectedVersion: "latest",
  }
}

export function isPathDocument(path: string) {
  return (
    !path.includes(".") ||
    path.toLowerCase().endsWith(".md") ||
    path.toLowerCase().endsWith(".mdx")
  )
}
