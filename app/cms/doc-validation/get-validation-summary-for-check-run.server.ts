import pluralize from "pluralize"
import { getValidationSummaryForFile } from "./get-validation-summary-for-file"
import { validateChangesForCheckRun } from "./validate-for-check-run"
import { isValidatedUrlFailure, isValidatedUrlWarning } from "./validate-url"

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
    urlFailures: 0,
    urlWarnings: 0,
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
        counts.urlFailures += file.urls.filter(isValidatedUrlFailure).length
        counts.urlWarnings += file.urls.filter(isValidatedUrlWarning).length
      }

      if (file.status === "warning") {
        counts.warnings += 1
        counts.urlWarnings += file.urls.filter(isValidatedUrlWarning).length
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

    if (counts.urlFailures > 0) {
      title += ` (${counts.urlFailures} invalid ${pluralize(
        "link",
        counts.urlFailures
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
