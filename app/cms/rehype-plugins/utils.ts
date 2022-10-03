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

export const findTagName = (node: H.Node) => {
  if (isElement(node)) {
    return node.tagName
  }

  if (isMdxJsxFlowElement(node)) {
    return node.name
  }
}

/**
 * Attempts to locate any explicit `id` attribute set on a node.
 */
export const findNodeId = (node: H.Node) => {
  if (isMdxJsxFlowElement(node)) {
    // Check for an explicit JSX `id=` attribute
    const idAttribute = node.attributes.find(
      (attr) => attr.type === "mdxJsxAttribute" && attr.name === "id"
    )

    if (typeof idAttribute?.value === "string") {
      return idAttribute.value
    }
  }

  if (
    isElement(node) &&
    node.properties &&
    "id" in node.properties &&
    node.properties.id &&
    !Array.isArray(node.properties.id)
  ) {
    // Check for an explicit HTML `id=` attribute
    return String(node.properties.id)
  }

  // Check for `hProperties` from <https://github.com/syntax-tree/mdast-util-to-hast>
  const id = (node.data?.hProperties as any)?.id
  if (typeof id === "string") {
    return id
  }
}
