import { Body, Contribution } from "~/routes/action/refresh"
import mixpanel from "mixpanel"
import { getRequiredServerEnvVar } from "~/cms/helpers"

mixpanel.init(getRequiredServerEnvVar("MIXPANEL_DOCSITE_PROJECT_TOKEN"))

/**
 * Format and send event data for Mixpanel to ingest
 *
 * @param eventData Object containing merge event data
 */
export const recordRefreshEventInMixpanel = (eventData: Body) => {
  const properties = {
    commitCount: 0,
    commitSha: eventData.commitSha,
    repo: eventData.repo,
    contentPaths: eventData.contentPaths,
    keys: eventData.keys,
  }

  const mixpanelData = eventData.contributions?.map(
    (contribution: Contribution) => ({
      ...properties,
      distinct_id: contribution.contributor,
      commitCount: Number(contribution.commitCount),
    })
  ) || [
    {
      properties,
    },
  ]

  mixpanel.track("Documents Updated", mixpanelData)
}
