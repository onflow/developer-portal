import {
  MdxJsxAttribute,
  MdxJsxExpressionAttribute,
  MdxJsxFlowElement,
} from "mdast-util-mdx-jsx"
import type * as H from "hast"

/**
 * Type guard for checking if a node is an Element type.
 */
export const isElement = (node: H.Node): node is H.Element =>
  node.type === "element"

/**
 * Type guard for checking if a node is a MdxJsxFlowElement type.
 */
export const isMdxJsxFlowElement = (node: H.Node): node is MdxJsxFlowElement =>
  node.type === "mdxJsxFlowElement"

/**
 * Type guard for checking if an attribute is a MdxJsxAttribute
 */
const isMdxJsxAttribute = (
  attribute: MdxJsxAttribute | MdxJsxExpressionAttribute
): attribute is MdxJsxAttribute => attribute.type === "mdxJsxAttribute"

export const findTagName = (node: H.Node) => {
  if (isElement(node)) {
    return node.tagName
  }

  if (isMdxJsxFlowElement(node)) {
    return node.name
  }
}

export const findAttributeValue = (node: H.Node, attributeName: string) => {
  if (isElement(node)) {
    return node.properties?.[attributeName]
  }

  if (isMdxJsxFlowElement(node)) {
    const attribute = node.attributes
      .filter(isMdxJsxAttribute)
      .find(({ name }) => name === attributeName)

    return typeof attribute?.value === "string" ? attribute.value : undefined
  }
}

/**
 * Attempts to locate any explicit `id` attribute set on a node.
 */
export const findNodeId = (node: H.Node) => {
  const id = findAttributeValue(node, "id")

  if (!Array.isArray(id)) {
    return String(id)
  }

  // Check for `hProperties` from <https://github.com/syntax-tree/mdast-util-to-hast>
  const hPropertiesId = (node.data?.hProperties as any)?.id
  if (typeof hPropertiesId === "string") {
    return hPropertiesId
  }
}
