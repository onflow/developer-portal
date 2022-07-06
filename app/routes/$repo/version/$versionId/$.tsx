import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import invariant from "tiny-invariant"
import {
  internalPageLoader,
  InternalPageLoaderData,
  isPathDocument,
} from "~/cms/internal-page"
import { getContentSpec } from "~/constants/repos"
import { getMetaTitle } from "~/root"
export { CatchBoundary, default, ErrorBoundary } from "../../$"

export const loader: LoaderFunction = async ({ params, request }) => {
  const repo = params.repo
  invariant(repo, `expected repo param`)

  const path = params["*"] ?? "index"

  const versionId = params.versionId
  invariant(versionId, `expected version param`)

  const contentSpec = getContentSpec(repo, path)
  if (!contentSpec) {
    throw json({ status: "noRepo" }, { status: 404 })
  }

  if (!isPathDocument(path)) {
    // TODO!!
    throw redirect(`/${params.repo}/version/${versionId}/_raw/${path}`)
  }

  const fullPath = [`versioned_docs`, `version-${versionId}`, path].join("/")

  return internalPageLoader({
    fullPath,
    shortPath: path,
    contentSpec,
    request,
  })
}

export const meta: MetaFunction = ({ data }) => {
  const typedData = data as InternalPageLoaderData
  const title = typedData.page.frontmatter.title ?? `Untitled`

  return {
    title: getMetaTitle(`${title} · Version ${typedData.selectedVersion}`),
  }
}
