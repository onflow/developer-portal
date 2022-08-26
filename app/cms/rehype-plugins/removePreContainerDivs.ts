import type * as H from "hast"
import { visit } from "unist-util-visit"

export function removePreContainerDivs() {
  return async function preContainerDivsTransformer(tree: H.Root) {
    visit(
      tree,
      { type: "element", tagName: "pre" },
      function visitor(node, index, parent) {
        if (parent?.type !== "element") return
        if (parent.tagName !== "div") return
        if (parent.children.length !== 1 && index === 0) return
        Object.assign(parent, node)
      }
    )
  }
}
