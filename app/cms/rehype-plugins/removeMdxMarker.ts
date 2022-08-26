import type * as H from "hast"
import { visit } from "unist-util-visit"

/**
 * Unmarks any nodes that have the `_mdxExplicitJsx` flag set.
 * This allows us to override built-in HTML elements. For example if
 * a MDX file contains:
 *
 * ```mdx
 * <div><img src="./some-image.png"></div>
 * ```
 *
 * These elements will not normally be modifiable by the custom component
 * substitution map we pass as a prop (which is rather confusing and not
 * clear from the docs).
 *
 * @see {@link https://github.com/kentcdodds/mdx-bundler/issues/160#issuecomment-1140526121}
 * @see {@link https://github.com/mdx-js/mdx/pull/2052}
 * @see {@link https://github.com/kentcdodds/mdx-bundler/issues/160}
 * @see {@link https://github.com/kentcdodds/mdx-bundler#component-substitution}
 */
export const removeMdxMarker = () => (tree: H.Root) => {
  visit(tree, function visitor(node: H.Node, index, parent) {
    if ("data" in node && node.data && "_mdxExplicitJsx" in node.data) {
      delete node.data._mdxExplicitJsx
    }
  })
}
