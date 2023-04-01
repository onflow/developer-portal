import mixpanel from "mixpanel-browser"
import { getRequiredServerEnvVar } from "~/cms/helpers"

const mpToken = getRequiredServerEnvVar("MIXPANEL_DOCSITE_PROJECT_TOKEN")

/**
 * Format and send event data for Mixpanel to ingest
 *
 * @param eventData Object containing merge event data
 */
export const recordRefreshEventInMixpanel = (eventData: {
  user: string
  ref: string
  repo: { name: string; owner: string }
  updatedDocuments: string[]
  totalDocsUpdated: number
  env: string
}) => {
  if (!mpToken) return
  mixpanel.init(mpToken, { debug: true })
  console.log("Got contribution event")

  console.log("Sending data to Mixpanel:")
  mixpanel.track("documents_updated", eventData)
}
