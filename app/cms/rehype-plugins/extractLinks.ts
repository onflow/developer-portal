import type * as H from "hast"
import { Position } from "unist"
import { visit } from "unist-util-visit"
import { isElement, isMdxJsxFlowElement } from "./utils"

export type LinkItem = {
  href: string
  position?: Position
}

export type ExtractLinksOptions = {}

/**
 * Extracts the links
 *
 * The code for this was primarily taken from mdast-util-toc:
 * https://github.com/syntax-tree/mdast-util-toc/blob/main/lib/search.js
 * But in our case we're generating the ToC from HAST not MDAST. This is
 * because we might remove content with the `removeExcludedContent` plugin
 * and this happens after we've tranformed our Markdown in to HTML/JSX.
 *
 * @param toc A toc instance that will be mutated to include the resulting ToC.
 * @param options
 * @returns
 */
export const extractLinks =
  (links: LinkItem[], _: ExtractLinksOptions = {}) =>
  () =>
  (tree: H.Root) => {
    visit(tree, ["element", "mdxJsxFlowElement"], (node) => {
      if (isElement(node) && node.tagName.toLowerCase() === "a") {
        const href = node.properties?.href
        if (typeof href === "string") {
          links.push({ href, position: node.position })
        }
      }

      if (isMdxJsxFlowElement(node) && node.name?.toLowerCase() === "a") {
        const hrefAttribute = node.attributes.find(
          (attr) => attr.type === "mdxJsxAttribute" && attr.name === "href"
        )

        if (hrefAttribute && typeof hrefAttribute.value === "string") {
          links.push({ href: hrefAttribute.value, position: node.position })
        }
      }
    })
  }
