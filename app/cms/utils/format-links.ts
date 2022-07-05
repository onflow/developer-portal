import { visit } from "unist-util-visit"
import * as H from "hast"

const PARENT = "../"

function updateRelativeDepth(linkText: string, index = false) {
  switch (index) {
    case true:
      return linkText
    case false:
      return PARENT + linkText
    default:
      return linkText
  }
}

module.exports = updateRelativeDepth

const formatLinks = (repoName: string) => {
  return async function rewriteRelativeLinks(tree: H.Root) {
    visit(
      tree,
      { type: "element", tagName: "a" },
      function visitor(node, index, parent) {
        // @ts-expect-error: TODO: Needs type.
        let href: string = node.properties!.href!
        if (
          href &&
          !href.startsWith("/") &&
          !href.startsWith("#") &&
          !href.startsWith("mailto:") &&
          !/^https?:\/\//.test(href)
        ) {
          href = updateRelativeDepth(href, false)

          href = href.replace(/(?<=[^/])#/, "/#")
          href = href.replace(".mdx", "").replace(".md", "")
          // remove parent or current directory paths from href, ie. remove: `../` or `./`
          href = href.replaceAll(/(\.+\/)/g, "")
          href = `/${repoName}/${href}`

          // @ts-expect-error: TODO: Needs type.
          node.properties.href = href
        }
      }
    )
  }
}

export default formatLinks
