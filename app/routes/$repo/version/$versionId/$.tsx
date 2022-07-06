import { json, LoaderFunction, redirect } from "@remix-run/node"
import invariant from "tiny-invariant"
import { internalPageLoader, isPathDocument } from "~/cms/internal-page"
import { getContentSpec } from "~/constants/repos"
export { InternalPageRoute as default } from "~/cms/internal-page"
export { InternalErrorBoundary as ErrorBoundary } from "~/errors/error-boundaries"

export const loader: LoaderFunction = async ({ params, request }) => {
  const repo = params.repo
  invariant(repo, `expected repo param`)

  const path = params["*"]
  invariant(path, `expected * param`)

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
