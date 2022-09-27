import { Body, Contribution } from "~/routes/action/refresh"
import mixpanel from "mixpanel"
import { getRequiredServerEnvVar } from "~/cms/helpers"

const mpTokenInvalid = "idk" // <-- This should be the value set for the MIXPANEL_DOCSITE_PROJECT_TOKEN
// env var in environments where we want to disable tracking.

const mpToken = getRequiredServerEnvVar("MIXPANEL_DOCSITE_PROJECT_TOKEN")

if (mpToken && mpToken !== mpTokenInvalid)
  mixpanel.init(mpToken, { debug: true })

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

  console.log("Got contribution event")

  if (mpToken !== mpTokenInvalid) console.log("Sending data to Mixpanel:")
  mixpanel.track("Documents Updated", mixpanelData)
}
