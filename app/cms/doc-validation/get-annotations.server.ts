import { GithubAnnotation } from "../github/types"
import { validateChangesForCheckRun } from "./validate-for-check-run"
import {
  isValidatedLinkFailure,
  isValidatedLinkSuccess,
  isValidatedLinkWarning,
  ValidatedLink,
} from "./validate-link"

const getAnnotationLevel = (result: ValidatedLink) => {
  if (isValidatedLinkFailure(result)) {
    return "failure"
  }
  if (isValidatedLinkWarning(result)) {
    return "warning"
  }

  return "notice"
}

/**
 * Returns an array of annotations for any invalid link errors found
 */
export const getAnnotations = (
  validation: Awaited<ReturnType<typeof validateChangesForCheckRun>>
) =>
  validation.reduce((annotations, { files }) => {
    files.forEach((file) => {
      if (file.status === "failure" || file.status === "warning") {
        file.links.forEach((link) => {
          if (link.position && !isValidatedLinkSuccess(link)) {
            annotations.push({
              path: file.file,
              start_line: link.position.start.line,
              start_column: link.position.start.column,
              end_line: link.position.start.line,
              end_column: link.position.end.column,
              annotation_level: getAnnotationLevel(link),
              message: link.hint || link.result,
            })
          }
        })
      }
    })
    return annotations
  }, [] as Array<GithubAnnotation>)
