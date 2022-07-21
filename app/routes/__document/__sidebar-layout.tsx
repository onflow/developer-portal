import { LoaderFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { walkDir, fs } from "~/cms/utils/fs-utils.server"

// type Params = {
//   path?: string
//   repo?: string
//   "*"?: string
// }

type LoaderData = {}

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

    for (const segment of rest) {
      for (const preset of sidebarPresets) {
      }
    }

    // const sidebarPreset = `${basePresetSearchPath}/sidebar/${segments.slice(2).join('/')}.json`

    // if(await fs.pathExists(sidebarPreset)) {
    //     const menu = await fs.readJson(sidebarPreset)
    //     console.log("Menu:",  !!menu)
    // } else {
    //     throw "No menu..."
    // }
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
