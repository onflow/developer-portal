import pluralize from "pluralize"
import { FileValidationResult } from "./validate-collection.server"
import {
  isValidatedUrlFailure,
  isValidatedUrlSuccess,
  isValidatedUrlWarning,
} from "./validate-url"

/**
 * Gets the validation summary for a single file.
 */
export const getValidationSummaryForFile = (result: FileValidationResult) => {
  const { file, status } = result
  switch (status) {
    case "compile-error": {
      return `- 💥 ${file} - Compile failed: ${result.error.message}`
    }
    case "download-error": {
      return `- ⛔ ${file} - Download failed: ${result.error.message}`
    }
    case "validation-error": {
      return `- ❓ ${file} - Validation failed: ${result.error.message}`
    }
    case "warning":
    case "failure": {
      const failCount = result.urls.filter(isValidatedUrlFailure).length
      const warnCount = result.urls.filter(isValidatedUrlWarning).length

      const unsuccessfulSummaries = result.urls
        .map((url) => {
          if (isValidatedUrlSuccess(url)) {
            return false
          }

          const icon = isValidatedUrlFailure(url) ? "❗" : "?"
          let info = `  - ${icon} \`${url.href}\``

          if (url.position) {
            info += ` (Ln ${url.position.start.line}, Col ${url.position.start.column})`
          }

          if (url.hint) {
            info += `\r\n\r\n    > ${url.hint}`
          }

          return info
        })
        .filter((summary) => !!summary)

      const icon = failCount > 0 ? "❌" : "⚠️"
      const titles = [
        failCount && `${pluralize("invalid link", failCount, true)} found`,
        warnCount && pluralize("link warning", warnCount, true),
      ].filter((title) => !!title)

      return [
        `- ${icon} ${file} - ${titles.join(",  ")}`,
        ...unsuccessfulSummaries,
      ].join("\r\n")
    }
    case "ok": {
      return `- ✅ ${file} - OK`
    }
  }
}
