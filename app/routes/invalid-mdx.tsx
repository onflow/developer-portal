import { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getMdxPage } from "~/cms/utils/mdx"
import cadenceMdxFiles from "~/constants/cadence-mdx-files.json"

export const loader: LoaderFunction = async () => {
  async function isMdxValid(
    repo: string,
    path: string
  ): Promise<[true, null] | [false, Error]> {
    let _page

    try {
      _page = await getMdxPage(
        {
          repo,
          fileOrDirPath: path,
        },
        { forceFresh: process.env.FORCE_REFRESH === "true" }
      )
      return [true, null]
    } catch (e) {
      return [false, e as Error]
    }
  }

  let results: Array<[string, boolean]> = []

  for (const path of cadenceMdxFiles) {
    const pathWithoutPrefix = path.replace("./docs/", "")

    const [isValid, e] = await isMdxValid("cadence", pathWithoutPrefix)
    console.log(`${path} ${isValid ? "valid" : "ERROR"}`)
    results.push([path, isValid, JSON.stringify(e)])
  }

  return {
    results,
  }
}

export default function InvalidMdx() {
  const data = useLoaderData()
  return (
    <table>
      {data.results.map(([path, isValid, errorText]: any) => (
        <tr key={path}>
          <td>{path}</td>
          <td>{isValid ? "Valid" : "INVALID"}</td>
          <td>{errorText}</td>
        </tr>
      ))}
    </table>
  )
}
