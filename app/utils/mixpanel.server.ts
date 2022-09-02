import axios from "axios"
import { Body, Contribution } from "~/routes/action/refresh"

/**
 * Format and send event data for Mixpanel to ingest
 *
 * @param eventData Object containing merge event data
 */
export const recordRefreshEventInMixpanel = (eventData: Body) => {
  const properties = {
    token: process.env.MIXPANEL_DOCSITE_PROJECT_TOKEN,
    commitCount: 0,
    commitSha: eventData.commitSha,
    repo: eventData.repo,
    contentPaths: eventData.contentPaths,
    keys: eventData.keys,
  }

  const mixpanelData = eventData.contributions?.map(
    (contribution: Contribution) => ({
      event: "Docs Refresh",
      properties: {
        ...properties,
        distinct_id: contribution.contributor,
        commitCount: Number(contribution.commitCount),
      },
    })
  ) || [
    {
      event: "Docs Refresh",
      properties,
    },
  ]

  axios.post(process.env.MIXPANEL_EVENT_TRACKING_URL as string, mixpanelData, {
    headers: { Accept: "text/plain", "Content-Type": "application/json" },
  })
}
