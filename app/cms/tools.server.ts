import { Tool } from "../data/tools"
import { fetchRepo } from "./utils/fetch-repo"
import { fetchBranch } from "./utils/fetch-branch"
import logger from "../utils/logging.server"

type ToolStats = Partial<Pick<Tool, "authorIcon" | "stars" | "lastCommit">>

/**
 * Retrieves the latest stats (`authorIcon`, `lastCommit`, and `stars`) for
 * the given tool, if available.
 *
 * @param tool
 * @returns the stats found for the given tool, if any.
 */
const fetchToolStats = async (tool: Readonly<Tool>): Promise<ToolStats> => {
  if (!tool.repo) {
    // Nothng to update.
    return {}
  }

  let repo: Awaited<ReturnType<typeof fetchRepo>>

  try {
    repo = await fetchRepo({
      owner: tool.repo.owner,
      repo: tool.repo.name,
    })
  } catch (error) {
    logger.error(`fetchRepo failed for "${tool.repo.owner}/${tool.repo.name}`)
    throw error
  }

  let branch: Awaited<ReturnType<typeof fetchBranch>>

  try {
    branch = await fetchBranch({
      owner: tool.repo.owner,
      repo: tool.repo.name,
      branch: repo.data.default_branch,
    })
  } catch (error) {
    logger.error(
      `fetchBranch failed for "${tool.repo.owner}/${tool.repo.name}/${repo.data.default_branch}`
    )
    throw error
  }

  const data: ToolStats = {
    authorIcon:
      repo.data.organization?.avatar_url || repo.data.owner.avatar_url,
    stars: repo.data.stargazers_count,
  }

  const date =
    branch.data.commit.commit.committer?.date ||
    branch.data.commit.commit.author?.date

  if (date) {
    data.lastCommit = date
  }

  return data
}

/**
 * Refreshes the properties for the given tool based on data from github.
 * This mutates the tool argument directly.
 */
const refreshTool = async (tool: Tool) => {
  if (!tool.repo) {
    return tool
  }

  try {
    const stats = await fetchToolStats(tool)
    tool.authorIcon = stats.authorIcon ?? tool.authorIcon
    tool.lastCommit = stats.lastCommit ?? tool.lastCommit
    tool.stars = stats.stars ?? tool.stars
  } catch (err) {
    logger.error(`Failed to refresh tool "${tool.title}"`, err)
  }

  return tool
}

/**
 * Refreshes the `authorIcon`, `lastCommit`, and `stars` property on any
 * tools that have a `repo` property. This works by mutating the tools
 * objects that are passed in as parameters.
 */
export const refreshTools = async (...tools: Tool[]) =>
  Promise.allSettled(tools.map(refreshTool))
