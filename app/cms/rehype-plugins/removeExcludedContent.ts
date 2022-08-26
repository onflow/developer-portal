import type * as H from "hast"
import { filter } from "unist-util-filter"
import { EXCLUDE_CONTENT_CLASS_NAME } from "../utils/constants"
import { isMdxJsxFlowElement } from "./utils"

/**
 * Removes any JSX element nodes that have a className which includes the
 *  `EXCLUDE_CONTENT_CLASS_NAME` value, and anything wrapped in an
 * `<omit>` element.
 */
export const removeExcludedContent = () => (tree: H.Root) =>
  filter(tree, (node) => {
    if (isMdxJsxFlowElement(node)) {
      if (node.name === "omit") {
        return false
      }

      return !node.attributes.some(
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
