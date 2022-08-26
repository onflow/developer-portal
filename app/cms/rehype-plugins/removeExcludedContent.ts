import type * as H from "hast"
import { MdxJsxFlowElement } from "mdast-util-mdx-jsx"
import { filter } from "unist-util-filter"
import { EXCLUDE_CONTENT_CLASS_NAME } from "../utils/constants"

/**
 * Removes any JSX element nodes that have a className which includes the
 *  `EXCLUDE_CONTENT_CLASS_NAME` value.
 */
export const removeExcludedContent = () => (tree: H.Root) =>
  filter(tree, (node) => {
    if (node.type === "mdxJsxFlowElement") {
      const mdxNode = node as MdxJsxFlowElement

      return !mdxNode.attributes.some(
        (attribute) =>
          attribute.type === "mdxJsxAttribute" &&
          attribute.name === "className" &&
          typeof attribute.value === "string" &&
          attribute.value
            .toLowerCase()
            .split(" ")
            .includes(EXCLUDE_CONTENT_CLASS_NAME)
      )
    }

    return true
  })
