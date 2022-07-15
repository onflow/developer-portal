import axios from "axios"
import { Body, Contribution } from "~/routes/action/refresh"

/**
 * Format and send event data for Mixpanel to ingest
 *
 * @param eventData Object containing merge event data
 */
export const recordRefreshEventInMixpanel = (eventData: Body) => {
  const mixpanelData = eventData.contributions.map(
    (contribution: Contribution) => ({
      event: "Cache Refresh v2",
      properties: {
        token: process.env.MIXPANEL_DOCSITE_PROJECT_TOKEN,
        distinct_id: contribution.contributor,
        commitCount: Number(contribution.commitCount),
        commitSha: eventData.commitSha,
        repo: eventData.repo,
        contentPaths: eventData.contentPaths,
        keys: eventData.keys,
      },
    })
  )
  axios.post(process.env.MIXPANEL_EVENT_TRACKING_URL as string, mixpanelData, {
    headers: { Accept: "text/plain", "Content-Type": "application/json" },
  })
}
