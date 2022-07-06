import { json, LoaderFunction, MetaFunction, redirect } from "@remix-run/node"
import invariant from "tiny-invariant"
import {
  internalPageLoader,
  InternalPageLoaderData,
  isPathDocument,
} from "~/cms/internal-page"
import { getContentSpec, isFlowContent, isFlowSection } from "~/constants/repos"
import { getMetaTitle } from "~/root"
export {
  InternalPageRoute as default,
  CatchBoundary,
} from "~/cms/internal-page"
export { InternalErrorBoundary as ErrorBoundary } from "~/errors/error-boundaries"

export const loader: LoaderFunction = ({ params, request }) => {
  /*
  Because of added complexity of routing, the 'repo' is no longer necessarily the name of the repository.
  For instance, params.repo could be a section name, repo name, or /flow's internal content name.
  For less confusion, we will call this firstRoute.
  Examples:
  - Repository = /cadence/... then firstRoute = cadence, cadence is a repo
  - Section = /learn/kitty-items/... then firstRoute = learn, learn is a section, and kitty-items is flow's content
  */
  const firstRoute = params.repo
  const { secondRoute, path } = deconstructPath(firstRoute, params["*"])

  invariant(firstRoute, `expected repo param`)

  const contentSpec = getContentSpec(firstRoute, secondRoute)
  if (!contentSpec) {
    throw json({ status: "noRepo" }, { status: 404 })
  }

  if (!isPathDocument(path)) {
    throw redirect(`/${params.repo}/_raw/${path}`)
  }

  const fullPath = [contentSpec.basePath, path].join("/")

  return internalPageLoader({
    fullPath,
    shortPath: path,
    contentSpec,
    request,
  })
}

export const meta: MetaFunction = ({ data }) => {
  const typedData = data as InternalPageLoaderData
  const title = typedData.page.frontmatter.title
  return {
    title: getMetaTitle(title),
  }
}

const deconstructPath = (
  firstRoute: string | undefined,
  rawPath: string | undefined
): { secondRoute: string | undefined; path: string } => {
  if (firstRoute && rawPath) {
    const split: string[] = rawPath.split("/") ?? []
    const second: string = split.length > 0 ? split[0]! : ""
    const splitAfterSecond: string[] = split.length > 1 ? split.slice(1) : []

    const rest: string =
      splitAfterSecond.length > 0 ? splitAfterSecond.join("/") : "index"

    if (isFlowSection(firstRoute) && isFlowContent(second)) {
      /* >> Start of custom landing pages >> */
      if (second === "faq" && rest === "index") {
        return { secondRoute: second, path: "backers" }
      }
      /* << End of custom landing pages << */
      return { secondRoute: second, path: rest }
    }
    return { secondRoute: undefined, path: rawPath }
  } else {
    /* >> Start of custom landing pages >> */
    if (firstRoute === "flow") {
      return { secondRoute: undefined, path: "concepts/index" }
    } else if (firstRoute === "nodes") {
      return { secondRoute: undefined, path: "node-operation/index" }
    }
    /* << End of custom landing pages << */

    return { secondRoute: undefined, path: "index" }
  }
}
