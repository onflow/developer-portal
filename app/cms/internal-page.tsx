import { json } from "@remix-run/node"
import {
  Form,
  Link,
  useCatch,
  useLoaderData,
  useLocation,
} from "@remix-run/react"
import { getMdxPage, useMdxComponent } from "~/cms/utils/mdx"
import { ContentSpec, contentTools } from "~/constants/repos"
import { ContentName } from "~/constants/repos/contents-structure"
import { ErrorPage } from "~/ui/design-system/src/lib/Components/ErrorPage"
import { ToolName } from "~/ui/design-system/src/lib/Components/Internal/tools"
import { InternalPage } from "~/ui/design-system/src/lib/Pages/InternalPage"
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
    versions: ["latest", "1.1.0"],
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

export function InternalPageRoute() {
  const data = useLoaderData<InternalPageLoaderData>()
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
