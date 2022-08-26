import { MdxJsxFlowElement } from "mdast-util-mdx-jsx"
import type * as H from "hast"

/**
 * Type guard for checking if a node is an Element type.
 */
export function isElement(node: H.Node): node is H.Element {
  return node.type === "element"
}

/**
 * Type guard for checking if a node is a MdxJsxFlowElement type.
 */
export function isMdxJsxFlowElement(node: H.Node): node is MdxJsxFlowElement {
  return node.type === "mdxJsxFlowElement"
}
