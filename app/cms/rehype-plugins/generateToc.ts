import type * as H from "hast"
import Slugger from "github-slugger"
import { toString } from "hast-util-to-string"
import { visit } from "unist-util-visit"
import {
  isElement,
  isMdxJsxFlowElement,
  findNodeId,
  findTagName,
} from "./utils"

export type TocItem = {
  title: string
  hash: string
}

export type GenerateTocOptions = {
  /**
   * Maximum heading depth to include in the table of contents (number, default: 6),
   * This is inclusive: when set to 3, level three headings are included (h3).
   */
  maxDepth?: number
}

const slugs = new Slugger()

const HEADER_TAGNAME_REGEXP = /^h([1-6])$/i

/**
 * Generates a table of contents from any `<h# />` elements in the AST.
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
export const generateToc =
  (toc: TocItem[], { maxDepth = 6 }: GenerateTocOptions = {}) =>
  () =>
  (tree: H.Root) => {
    slugs.reset()

    visit(tree, ["element", "mdxJsxFlowElement"], (node, position, parent) => {
      if (!(isElement(node) || isMdxJsxFlowElement(node))) {
        return
      }

      const tagName = findTagName(node)

      if (!tagName) {
        // Not a node type we care about or can identify
        return
      }

      const result = HEADER_TAGNAME_REGEXP.exec(tagName)

      if (!result) {
        // Not a h# element
        return
      }

      const depth = parseInt(result[1]!)

      if (depth > maxDepth) {
        // exceeds desired maxDepth and should be excluded from the ToC.
        return
      }

      const title = toString(node)
      const id = findNodeId(node)
      const slug = slugs.slug(id || title)

      toc.push({ title, hash: `#${slug}` })

      // Store the slug value that we used in a `data-slug` attribute so it
      // can be used later when we render the component.

      if (isElement(node)) {
        node.properties = node.properties || {}
        node.properties["data-slug"] = slug
      }

      if (isMdxJsxFlowElement(node)) {
        node.attributes.push({
          type: "mdxJsxAttribute",
          name: "data-slug",
          value: slug,
        })
      }
    })
  }
