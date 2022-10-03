export const stripMarkdownExtension = (href: string) =>
  href?.replace(/(.mdx?)/, "")
