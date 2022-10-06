import pluralize from "pluralize"
import { getValidationSummaryForFile } from "./get-validation-summary-for-file"
import { validateChangesForCheckRun } from "./validate-for-check-run"
import { isValidatedLinkFailure, isValidatedLinkWarning } from "./validate-link"

export const getValidationSummaryForCheckRun = (
  validation: Awaited<ReturnType<typeof validateChangesForCheckRun>>
) => {
  const counts = {
    compileErrors: 0,
    downloadErrors: 0,
    validationErrors: 0,
    failures: 0,
    warnings: 0,
    ok: 0,
    linkFailures: 0,
    linkWarnings: 0,
  }

  validation.forEach(({ files }) => {
    files.forEach((file) => {
      if (file.status === "compile-error") {
        counts.compileErrors += 1
      }

      if (file.status === "download-error") {
        counts.downloadErrors += 1
      }

      if (file.status === "validation-error") {
        counts.validationErrors += 1
      }

      if (file.status === "failure") {
        counts.failures += 1
        counts.linkFailures += file.links.filter(isValidatedLinkFailure).length
        counts.linkWarnings += file.links.filter(isValidatedLinkWarning).length
      }

      if (file.status === "warning") {
        counts.warnings += 1
        counts.linkWarnings += file.links.filter(isValidatedLinkWarning).length
      }

      if (file.status === "ok") {
        counts.ok = 0
      }
    })
  })

  const failedFiles =
    counts.compileErrors +
    counts.downloadErrors +
    counts.validationErrors +
    counts.failures

  let title = "No problems found"
  let conclusion = "success"

  if (failedFiles > 0) {
    conclusion = "failure"
    title = `Errors found in ${failedFiles} ${pluralize("files", failedFiles)}`

    if (counts.linkFailures > 0) {
      title += ` (${counts.linkFailures} invalid ${pluralize(
        "link",
        counts.linkFailures
      )})`
    }
  } else if (counts.warnings > 0) {
    title = `Warnings found in ${counts.warnings} ${pluralize(
      "files",
      counts.warnings
    )}`
    conclusion = "neutral"
  }

  return {
    ...counts,
    conclusion,
    title,
    status: "",
    summary: validation
      .map(
        ({ collection, files }) => `
# ${collection.manifest.displayName}
${files.map((file) => getValidationSummaryForFile(file)).join("\r\n")}`
      )
      .join("\r\n"),
  }
}
