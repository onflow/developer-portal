import repoNames from "~/cms/content-repos"
import { octokit } from "~/cms//github.server"

const DEFAULT_PRESET_EXT = ".json"

async function findPreset(
  owner: string,
  repoName: string,
  presetName: string,
  path: string
) {
  try {
    const exact = await octokit.repos.getContent({
      owner: owner,
      repo: repoName,
      path: `docs/route-data/${presetName}/${path}.json`,
    })

    return exact
  } catch (e) {
    try {
      const dirIndex = await octokit.repos.getContent({
        owner: owner,
        repo: repoName,
        path: `docs/route-data/${presetName}/${path}/index.json`,
      })

      return dirIndex
    } catch (e) {}
  }
}

// returns the route preset for the closest matching parent route,
// defined by the route-data folder structure.
export default async function getRemotePreset(
  url: string,
  presetName: string,
  repoName: string
) {
  const repo = repoNames[repoName]

  if (repo) {
    try {
      const path = new URL(url).pathname
      const segments = path.split("/")
      try {
        const preset = await findPreset(repo.owner, repoName, presetName, path)
        return preset
      } catch (e) {
        console.log(e)
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
      console.log(e)
      console.log("No remote preset... \n")
    }
  }

  return false
}
