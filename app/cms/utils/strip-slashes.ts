/**
 * Strips starting, trailing, and consecutive slashes from a string.
 */
export const stripSlahes = (input: string) =>
  input
    .split("/")
    .filter((segment) => !!segment)
    .join("/")

/**
 * Strips trailing slashes from a string.
 */
export const stripTrailingSlahes = (input: string) => input.replace(/\/+$/, "")

/**
 * Strips starting slashes from a string.
 */
export const stripStartingSlahes = (input: string) => input.replace(/^\/+/, "")
