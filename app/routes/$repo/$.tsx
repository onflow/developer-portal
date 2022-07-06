import { json, LoaderFunction, redirect } from "@remix-run/node"
import {
  Form,
  Link,
  useCatch,
  useLoaderData,
  useLocation,
} from "@remix-run/react"
import invariant from "tiny-invariant"
import { getMdxPage, useMdxComponent } from "~/cms/utils/mdx"
import {
  ContentSpec,
  contentTools,
  getContentSpec,
  isFlowContent,
  isFlowSection,
} from "~/constants/repos"
import { ContentName } from "~/constants/repos/contents-structure"
import { ErrorPage } from "~/ui/design-system/src/lib/Components/ErrorPage"
import { MdxPage } from "../../cms"
import { ToolName } from "../../ui/design-system/src/lib/Components/Internal/tools"
import { InternalPage } from "../../ui/design-system/src/lib/Pages/InternalPage"
export { InternalErrorBoundary as ErrorBoundary } from "~/errors/error-boundaries"

type LoaderData = {
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

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<LoaderData> => {
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

  const isDocument =
    !path.includes(".") ||
    path.toLowerCase().endsWith(".md") ||
    path.toLowerCase().endsWith(".mdx")

  if (!isDocument) {
    throw redirect(`/${params.repo}/_raw/${path}`)
  }
  let page: MdxPage | null

  try {
    page = await getMdxPage(
      {
        owner: contentSpec.owner,
        repo: contentSpec.repoName,
        branch: contentSpec.branch,
        fileOrDirPath: [contentSpec.basePath, path].join("/"),
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
    path,
    page,
    versions: ["latest", "1.1.0"],
    selectedVersion: "latest",
  }
}

export default function RepoDocument() {
  const data = useLoaderData<LoaderData>()
  const MDXContent = useMdxComponent(data.page)
  const tool = contentTools[data.content.contentName]

  return (
    <>
      {data.versions ? (
        <Form>
          <select
            defaultValue={data.selectedVersion}
            name="version"
            className="bg-black"
          >
            {data.versions.map((version) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </select>
        </Form>
      ) : null}
      <InternalPage
        activePath={data.path}
        contentDisplayName={data.content.displayName}
        contentPath={data.content.contentName}
        header={data.path === "index" ? data.content.landingHeader : undefined}
        sidebarConfig={data.content.schema?.sidebar}
        internalSidebarMenu={
          tool && {
            selectedTool: tool,
            toolLinks: toolLinks,
          }
        }
        githubUrl={data.page.editLink}
        toc={data.page.toc}
      >
        <MDXContent />
      </InternalPage>
    </>
  )
}

const toolContentMap: Record<ToolName, ContentName> = {
  cadence: "cadence",
  cli: "flow-cli",
  emulator: "flow-emulator",
  fcl: "fcl-js",
  testing: "flow-js-testing",
  vscode: "vscode-extension",
}

const toolLinks: Record<ToolName, string> = { ...toolContentMap }
for (let [key, value] of Object.entries(toolLinks)) {
  toolLinks[key as ToolName] = `/${value}`
}

export function CatchBoundary() {
  const caught = useCatch()
  console.error("CatchBoundary $.tsx", caught)
  const location = useLocation()

  switch (caught.data.status) {
    case "noPage":
      return (
        <ErrorPage
          title={"404 – Page not found"}
          subtitle={`there is no page at "${location.pathname}"`}
          actions={
            <Link className="underline" to="/">
              Go home
            </Link>
          }
        />
      )
    case "mdxError":
      return (
        <ErrorPage
          title={"Error processing"}
          subtitle={`An error occured processing the mdx for this document`}
          actions={
            <Link className="underline" to="/">
              Go home
            </Link>
          }
        />
      )
    case "noRepo":
      return (
        <ErrorPage
          title={"404 – Repo not found"}
          subtitle={`This repo is not available or does not exist`}
          actions={
            <Link className="underline" to="/">
              Go home
            </Link>
          }
        />
      )
  }

  throw new Error(`Unhandled error: ${caught.status}`)
}
