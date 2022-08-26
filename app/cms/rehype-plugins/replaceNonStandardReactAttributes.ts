import type * as H from "hast"
import { MdxJsxFlowElement } from "mdast-util-mdx-jsx"
import { visit } from "unist-util-visit"

const REACT_ATTRIBUTES: Record<string, string> = {
  class: "className",
  for: "htmlFor",
}

/**
 * Replaces some incorrectly named attributes with their correct React
 * equivalents.
 */
export const replaceNonStandardReactAttributes = () => (tree: H.Root) => {
  visit(tree, "mdxJsxFlowElement", (node: MdxJsxFlowElement) => {
    node.attributes.forEach((attr) => {
      if (attr.type === "mdxJsxAttribute" && REACT_ATTRIBUTES[attr.name]) {
        attr.name = REACT_ATTRIBUTES[attr.name]!
      }
    })
  })
}
