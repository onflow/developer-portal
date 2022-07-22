import { LoaderFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { split } from "lodash"
import { walkDir, fs, path as fsPath } from "~/cms/utils/fs-utils.server"

// type Params = {
//   path?: string
//   repo?: string
//   "*"?: string
// }

type LoaderData = {}

async function findPreset(searchPath: string, base: string) {
  const exact = await fs.pathExists(`${base}/sidebar/${searchPath}.json`)
  if (exact) return fs.readJson(`${base}/sidebar/${searchPath}.json`)

  const dir = await fs.pathExists(`${base}/sidebar/${searchPath}`)
  if (dir) return fs.readJson(`${base}/sidebar/${searchPath}/index.json`)
}

async function getSidebarConfig(url: string) {
  try {
    const path = new URL(url).pathname
    const segments = path.split("/")

    const base = segments[1]
    const rest = segments.slice(2)

    const basePresetSearchPath = `${process.cwd()}/app/cms/route-presets/${base}`
    const presets = await fs.pathExists(basePresetSearchPath)

    if (!presets) {
      throw "No menu ..."
    }

    if (!rest.length) {
      const baseIndexPresetPath = `${basePresetSearchPath}/sidebar/index.json`
      const baseIndexPreset = await fs.pathExists(baseIndexPresetPath)

      if (baseIndexPreset) {
        const preset = await fs.readJson(baseIndexPresetPath)
        return preset
      } else {
        throw "No menu ..."
      }
    }

    const sidebarPresets = await walkDir.async(
      `${basePresetSearchPath}/sidebar`
    )

    if (!sidebarPresets.length) {
      throw "No menu ..."
    }

    const searchPath = rest.join("/")
    const preset = await findPreset(searchPath, basePresetSearchPath)
    if (preset) return preset

    const restSearch = [...rest]
    restSearch.pop()

    while (restSearch.length) {
      const searchPath = restSearch.join("/")
      const preset = await findPreset(searchPath, basePresetSearchPath)
      if (preset) return preset
      restSearch.pop()
    }
  } catch (e) {
    console.log(e)
    return {}
  }

  return {}
}

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<LoaderData> => {
  const sidebarConfig = await getSidebarConfig(request.url)
  console.log("Got sidebar config", sidebarConfig)
  return { sidebarConfig }
}

export default function RepoDocument() {
  return (
    <>
      SIDEBAR
      <Outlet />
    </>
  )
}
