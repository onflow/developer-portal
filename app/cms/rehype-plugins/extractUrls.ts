import type * as H from "hast"
import { Position } from "unist"
import { visit } from "unist-util-visit"
import { findAttributeValue, findTagName } from "./utils"

export type UrlItem = {
  attributeName: string
  tagName: string
  href: string
  position?: Position
}

export type ExtractUrlsOptions = {}

/**
 * A mapping of element or component names to the list attributes we want to
 * extract from them.
 */
const ELEMENT_ATTRIBUTE_MAP: Record<string, string[]> = {
  a: ["href"],
  img: ["src"],
  Img: ["src"],

  // We can easily check additional tags/attributes i.e.:
  // img: ["src", "srcset"],
  // source: ["src", "srcset"],
  // video: ["src"],
  // link: ["href", "imagesrcset"],
  // iframe: ["src"],
  // embed: ["src"],
  // etc...
}

/**
 * Extracts any urls referenced in a tree.
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
export const extractUrls =
  (urls: UrlItem[], _: ExtractUrlsOptions = {}) =>
  () =>
  (tree: H.Root) => {
    visit(tree, ["element", "mdxJsxFlowElement"], (node) => {
      const tagName = findTagName(node)

      if (!tagName || !ELEMENT_ATTRIBUTE_MAP[tagName]) {
        return
      }

      ELEMENT_ATTRIBUTE_MAP[tagName]?.forEach((attributeName) => {
        const value = findAttributeValue(node, attributeName)

        // REVISIT: values can also technically be of type `boolean` or
        // `number` - for now we will ignore those but we may want to
        // extract them to report on potential errors?

        if (Array.isArray(value)) {
          value
            .filter((value) => typeof value === "string")
            .forEach((value) => {
              urls.push({
                attributeName,
                tagName,
                href: value as string, // This is a string because of the filter.
                position: node.position,
              })
            })
        } else if (typeof value === "string") {
          urls.push({
            attributeName,
            tagName,
            href: value,
            position: node.position,
          })
        }
      })
    })
  }
