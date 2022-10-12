/**
 * A regex to filter markdown file names based on their extension.
 */
export const MARKDOWN_EXTENSION_FILTER = /(.mdx?)/
type FilterFileNameHasMarkdownExtensionInput = {
  filename: string
}

/**
 * Returns true if the `filename` property of the input object has a
 * markdown extension.
 */
export const filterFileNameHasMarkdownExtension = (
  file: FilterFileNameHasMarkdownExtensionInput
) => MARKDOWN_EXTENSION_FILTER.test(file.filename)

/**
 * Returns true if the input has a markdown extension.
 */
export const filterHasMarkdownExtension = (input: string) =>
  MARKDOWN_EXTENSION_FILTER.test(input)
