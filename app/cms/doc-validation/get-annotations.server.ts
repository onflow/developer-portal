import { GithubAnnotation } from "../github/types"
import { validateChangesForCheckRun } from "./validate-for-check-run"
import {
  isValidatedUrlFailure,
  isValidatedUrlSuccess,
  isValidatedUrlWarning,
  ValidatedUrl,
} from "./validate-url"

const getAnnotationLevel = (result: ValidatedUrl) => {
  if (isValidatedUrlFailure(result)) {
    return "failure"
  }
  if (isValidatedUrlWarning(result)) {
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
        file.urls.forEach((url) => {
          if (url.position && !isValidatedUrlSuccess(url)) {
            annotations.push({
              path: file.file,
              start_line: url.position.start.line,
              start_column: url.position.start.column,
              end_line: url.position.start.line,
              end_column: url.position.end.column,
              annotation_level: getAnnotationLevel(url),
              message: url.hint || url.result,
            })
          }
        })
      }
    })
    return annotations
  }, [] as Array<GithubAnnotation>)
