/**
 * A regex to filter markdown file names based on their extension.
 */
export const MARKDOWN_EXTENSION_FILTER = /(.mdx?)/

type FilterFileNameHasMarkdownExtensionInput = {
  filename: string
}

/**
 * Returns true if the `filename` property of the object has a markdown extension.
 */
export const filterFileNameHasMarkdownExtension = (
  file: FilterFileNameHasMarkdownExtensionInput
) => MARKDOWN_EXTENSION_FILTER.test(file.filename)
