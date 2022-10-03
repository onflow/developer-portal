import { GithubAnnotation } from "../github/types"
import { validateChangesForCheckRun } from "./validate-for-check-run"

/**
 * Returns an array of annotations for any invalid link errors found
 */
export const getAnnotations = (
  validation: Awaited<ReturnType<typeof validateChangesForCheckRun>>
) =>
  validation.reduce((annotations, { files }) => {
    files.forEach((file) => {
      if (file.status === "link-error") {
        file.invalidLinks.forEach((link) => {
          if (link.position) {
            annotations.push({
              path: file.file,
              start_line: link.position.start.line,
              start_column: link.position.start.column,
              end_line: link.position.start.line,
              end_column: link.position.end.column,
              annotation_level: "failure",
              message: "Invalid link",
            })
          }
        })
      }
    })
    return annotations
  }, [] as Array<GithubAnnotation>)
