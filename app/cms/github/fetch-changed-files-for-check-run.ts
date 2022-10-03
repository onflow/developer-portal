import { CheckRunEvent, Repository } from "@octokit/webhooks-types"
import logger from "../../utils/logging.server"
import { octokit } from "./octokit.server"

export const fetchChangedFilesForCheckRun = async (
  repo: Repository,
  checkRun: CheckRunEvent["check_run"]
) => {
  if (checkRun.pull_requests.length > 0) {
    // Prefer to use a pull request if available.
    const pullRequest = checkRun.pull_requests[0]!
    logger.debug(
      `Fetching files for check run ${checkRun.id} using pull request #${pullRequest.number}`
    )
    const { data } = await octokit.pulls.listFiles({
      owner: repo.owner.login,
      repo: repo.name,
      pull_number: pullRequest.number,
    })
    return data
  } else {
    // Fallback to comparing this branch with the default branch.
    const basehead = `${repo.default_branch}...${checkRun.head_sha}`
    logger.debug(
      `Fetching files for check run ${checkRun.id} using diff of ${basehead}`
    )
    const diff = await octokit.request(
      "GET /repos/{owner}/{repo}/compare/{basehead}",
      {
        owner: repo.owner.login,
        repo: repo.name,
        basehead,
      }
    )
    return diff.data.files || []
  }
}
