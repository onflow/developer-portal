import { LoaderFunction } from "@remix-run/node"
import { getMdxPage, useMdxComponent } from "~/cms/utils/mdx"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"

export const loader: LoaderFunction = async ({ params, request }) => {
  const [repo, fileOrDirPath] = [params["repo"], params["*"] || "index"]
  invariant(repo, `expected a value`)

  let page
  try {
    page = await getMdxPage(
      {
        repo,
        fileOrDirPath,
      },
      { request, forceFresh: process.env.FORCE_REFRESH === "true" }
    )
  } catch (e) {
    throw json({ status: "noPage" }, { status: 500 })
  }

  if (!page) {
    throw json({ status: "noPage" }, { status: 404 })
  }

  return {
    page,
  }
}

export default function () {
  const data = useLoaderData()
  const { code, frontmatter } = data.page
  const Component = useMdxComponent({ code, frontmatter })

  return (
    <div className="flex flex-col py-8 md:flex-row">
      <Component />
    </div>
  )
}
