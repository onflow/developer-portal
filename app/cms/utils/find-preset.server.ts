import { fs } from "~/cms/utils/fs-utils.server"

// const DEFAULT_PRESET_EXT = ".json"

async function findPreset(searchPath: string, base: string) {
  /*
       Find the preset in the search path. Look for the exact match first.
       This means, if there is a language.json and a /language/index.json
       the language.json preset takes precedent.
     */

  const exact = await fs.pathExists(`${base}/sidebar/${searchPath}.json`)
  if (exact) return fs.readJson(`${base}/sidebar/${searchPath}.json`)

  const dir = await fs.pathExists(`${base}/sidebar/${searchPath}`)
  const hasIndex = await fs.pathExists(
    `${base}/sidebar/${searchPath}/index.json`
  )
  if (dir && hasIndex)
    return fs.readJson(`${base}/sidebar/${searchPath}/index.json`)
}

// returns the route preset for the closest matching parent route,
// defined by the route-data folder structure.
export default async function getPreset(url: string, presetName: string) {
  try {
    const path = new URL(url).pathname
    const segments = path.split("/")

    /*
      Take the first segment of the URL (eg. /cadence ) as the base folder for finding presets.
      This creates the constraint that route presets must be defined in a folder with the
      same name as the route we want to show a menu for.
     */

    const base = segments[1]

    /*
      The rest of the segments of the requested URL. Later we'll iterate over these
      to check if there are preset for 'parent' routes of the requested URL.
      See below.
     */
    const rest = segments.slice(2)

    const basePresetSearchPath = `${process.cwd()}/app/cms/route-data/${base}`
    const presets = await fs.pathExists(basePresetSearchPath)

    /*
      If there is no folder with the same name as the base,
      there are no preset so we can return.
     */

    if (!presets) {
      throw "No menu ..."
    }

    /*
      Start searching from the deepest child eg.
      if the URL is /base(ignored here)/language/accounts/crypto
      look for crypto.json or /base/language/accounts/crypto.json
      or /base/language/accounts/crypto/index.json
     */
    const searchPath = rest.join("/")
    const preset = await findPreset(searchPath, basePresetSearchPath)
    if (preset) return preset

    const restSearch = [...rest]

    /*
       If we didnt find anything, see if the parent route has a preset using the same method.
       Take the path /base(ignored here)/language/accounts/crypto and remove /crypto
       The new search path is now /base(ignored here)/language/accounts
     */

    restSearch.pop()

    while (restSearch.length) {
      /*
       repeat for all parent routes until we reach the base
     */

      const searchPath = restSearch.join("/")
      const preset = await findPreset(searchPath, basePresetSearchPath)

      // return the menu for the closest matching parent route.
      if (preset) return preset
      restSearch.pop()
    }
  } catch (e) {
    console.log(e)
    return {}
  }

  return {}
}
