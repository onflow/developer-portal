import pluralize from "pluralize"
import { FileValidationResult } from "./validate-collection.server"
import {
  isValidatedLinkFailure,
  isValidatedLinkSuccess,
  isValidatedLinkWarning,
} from "./validate-link"

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
      const failCount = result.links.filter(isValidatedLinkFailure).length
      const warnCount = result.links.filter(isValidatedLinkWarning).length

      const unsuccessfulSummaries = result.links
        .map((link) => {
          if (isValidatedLinkSuccess(link)) {
            return false
          }

          const icon = isValidatedLinkFailure(link) ? "❗" : "?"
          let info = `  - ${icon} \`${link.href}\``

          if (link.position) {
            info += ` (Ln ${link.position.start.line}, Col ${link.position.start.column})`
          }

          if (link.hint) {
            info += `\r\n\r\n    > ${link.hint}`
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
