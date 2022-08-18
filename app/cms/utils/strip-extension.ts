export default function removeMDorMDXFileExtension(path: string) {
  let removed = path
  if (path.endsWith("md") || path.endsWith("mdx")) {
    removed = path.split(".")[0]!
  }
  return removed
}
