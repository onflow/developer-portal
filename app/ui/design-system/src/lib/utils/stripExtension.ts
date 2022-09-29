export const stripExtension = (href: string) => {
  // Don't strip extensions from external links
  if (!/^https?:\/\//.test(href)) {
    return href?.replace(/(.mdx?)/, "")
  }
  return href
}
