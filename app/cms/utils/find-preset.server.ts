import { walkDir, fs } from "~/cms/utils/fs-utils.server"

async function findPreset(searchPath: string, base: string) {
  /* 
       Find the preset in the search path. Look for the exact match first. 
       This means, if there is a language.json and a /language/index.json 
       the language.json preset takes precedent. 
     */

  const exact = await fs.pathExists(`${base}/sidebar/${searchPath}.json`)
  if (exact) return fs.readJson(`${base}/sidebar/${searchPath}.json`)

  const dir = await fs.pathExists(`${base}/sidebar/${searchPath}`)
  if (dir) return fs.readJson(`${base}/sidebar/${searchPath}/index.json`)
}

// returns the route preset for the closest matching parent route,
// defined by the route-presets folder structure.
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

    const basePresetSearchPath = `${process.cwd()}/app/cms/route-presets/${base}`
    const presets = await fs.pathExists(basePresetSearchPath)

    /* 
      If there is no folder with the same name as the base, 
      there are no preset so we can return.
     */

    if (!presets) {
      throw "No menu ..."
    }

    if (!rest.length) {
      /* 
      We have a 'base' URL, now search for a file named index.json within.
      the preset folder of the same name. If none then we have no menus for this route.
      If this fails we return. (see throw below)
     */
      const baseIndexPresetPath = `${basePresetSearchPath}/${presetName}/index.json`
      const baseIndexPreset = await fs.pathExists(baseIndexPresetPath)

      if (baseIndexPreset) {
        const preset = await fs.readJson(baseIndexPresetPath)
        return preset
      } else {
        throw "No menu ..."
      }
    }

    /* 
      We did not find an exact match, and we're not dealing with a 'base' route, because there rest.length 
      We know at least there are folders here we get a list of all files and folders 
      in the base directory so we can search for the matching preset.
     */

    const sidebarPresets = await walkDir.async(
      `${basePresetSearchPath}/${presetName}`
    )

    // Not sure if this is necessary.
    if (!sidebarPresets.length) {
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
