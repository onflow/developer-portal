/**
 * The statuses we consider "changed" where the file still exists.
 */
const FILE_STATUS_FILTER = ["added", "modified", "renamed", "copied", "changed"]

type FilterFileDiffStatusIsChangedInput = {
  status: string
}

/**
 * Returns true if the `status` property of the object matches a diff status
 * in which the file has been changed and still exists (in other words, it isn't
 * "deleted" or "unchanged")
 */
export const filterFileDiffStatusIsChanged = (
  file: FilterFileDiffStatusIsChangedInput
) => FILE_STATUS_FILTER.includes(file.status)
