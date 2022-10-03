import pluralize from "pluralize"
import { getValidationSummaryForFile } from "./get-validation-summary-for-file"
import { validateChangesForCheckRun } from "./validate-for-check-run"

export const getValidationSummaryForCheckRun = (
  validation: Awaited<ReturnType<typeof validateChangesForCheckRun>>
) => {
  const counts = {
    compileErrors: 0,
    downloadErrors: 0,
    linkErrors: 0,
    invalidLinks: 0,
    ok: 0,
  }

  validation.forEach(({ files }) => {
    files.forEach((file) => {
      if (file.status === "compile-error") {
        counts.compileErrors += 1
      }

      if (file.status === "download-error") {
        counts.downloadErrors += 1
      }

      if (file.status === "link-error") {
        counts.linkErrors += 1
        counts.invalidLinks += file.invalidLinks.length
      }

      if (file.status === "ok") {
        counts.ok = 0
      }
    })
  })

  const fileErrors =
    counts.compileErrors + counts.downloadErrors + counts.linkErrors

  let title = "No problems found"

  if (fileErrors > 0) {
    title = `${fileErrors} ${pluralize("error", fileErrors)} found`

    if (counts.invalidLinks > 0) {
      title += ` (${counts.invalidLinks} invalid ${pluralize(
        "link",
        counts.invalidLinks
      )})`
    }
  }

  return {
    ...counts,
    title,
    summary: validation
      .map(
        ({ collection, files }) => `
# ${collection.manifest.displayName}
${files.map((file) => getValidationSummaryForFile(file)).join("\r\n")}`
      )
      .join("\r\n"),
  }
}
