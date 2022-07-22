import repoNames from "~/cms/content-repos"
import { octokit } from "~/cms//github.server"

const DEFAULT_PRESET_EXT = ".json"

async function findPreset(
  owner: string,
  repoName: string,
  presetName: string,
  path: string
) {
  /* 
       Find the preset in the search path. Look for the exact match first. 
       This means, if there is a language.json and a /language/index.json 
       the language.json preset takes precedent. 
     */

  const exact = await octokit.repos.getContent({
    owner: owner,
    repo: repoName,
    path: `docs/route-presets/${presetName}/${path}.json`,
  })

  if (exact) return exact

  const dirIndex = await octokit.repos.getContent({
    owner: owner,
    repo: repoName,
    path: `docs/route-presets/${presetName}/${path}/index.json`,
  })

  if (dirIndex) return dirIndex
}

// returns the route preset for the closest matching parent route,
// defined by the route-presets folder structure.
export default async function getRemotePreset(
  url: string,
  presetName: string,
  repoName: string
) {
  // @ts-expect-error: Nah bruh
  const repo = repoNames[repoName]

  if (repo) {
    try {
      const path = new URL(url).pathname
      const segments = path.split("/")
      try {
        const preset = await findPreset(repo.owner, repoName, presetName, path)
        return preset
      } catch (e) {
        const rest = segments.slice(2)

        const restSearch = [...rest]
        restSearch.pop()

        while (restSearch.length) {
          const searchPath = restSearch.join("/")
          const preset = await findPreset(
            repo,
            repoName,
            presetName,
            searchPath
          )

          if (preset) return preset
          restSearch.pop()
        }
      }
    } catch (e) {
      console.log("No remote preset... \n")
    }
  }

  return false
}
