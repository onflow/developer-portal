import pluralize from "pluralize"
import { FileValidationResult } from "./validate-collection.server"

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
    case "link-error": {
      const count = result.invalidLinks.length
      const invalidLinkSummaries = result.invalidLinks.map((link) => {
        let info = `  - \`${link.href}\``
        if (link.position) {
          info += ` (Ln ${link.position.start.line}, Col ${link.position.start.column})`
        }

        if (link.hint) {
          info += `\r\n\r\n    > ${link.hint}`
        }

        return info
      })

      return [
        `- ⚠️ ${file} - ${count} invalid ${pluralize("link", count)} found`,
        ...invalidLinkSummaries,
      ].join("\r\n")
    }
    case "ok": {
      return `- ✅ ${file} - OK`
    }
  }
}
