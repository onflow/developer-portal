import { toc } from "mdast-util-toc"
import { ListItem } from "mdast-util-toc/lib/contents"
import invariant from "tiny-invariant"
import { InternalTocProps } from "~/ui/design-system/src/lib/Components/InternalToc"

import { fromMarkdown } from "mdast-util-from-markdown"
import { frontmatterFromMarkdown } from "mdast-util-frontmatter"
import { frontmatter } from "micromark-extension-frontmatter"

type HeadingList = InternalTocProps["headings"]
type InternalTocItem = HeadingList[number]

export function isNotNull<T>(value: T): value is NonNullable<T> {
  return value != null
}

// NOTE: gets the relavent information we need to build the
// table of contents from the mdast!
export const markdownToToc = (doc: string): HeadingList | null => {
  const tree = fromMarkdown(doc, {
    extensions: [frontmatter(["yaml", "toml"])],
    mdastExtensions: [frontmatterFromMarkdown(["yaml", "toml"])],
  })

  const tocData = toc(tree, { maxDepth: 2 })

  if (tocData.map == null) {
    return null
  }

  const items = processItems(tocData.map.children)

  return items
}

function processItems(items: Array<ListItem>): Array<InternalTocItem> {
  return items.flatMap((item) => processChildren(item.children))
}

function processChildren(
  children: ListItem["children"]
): Array<InternalTocItem> {
  let items: Array<InternalTocItem> = []
  console.log(children)
  for (let child of children) {
    if (child.type === "paragraph") {
      const link = child.children.find((c) => c.type === "link")
      invariant(link, `expected a link`)
      invariant(link.type === "link")

      const linkText = link.children
        .map((c) => {
          if (c.type === "inlineCode" || c.type === "text") {
            return c.value
          }
          return null
        })
        .filter(isNotNull)
        .join("")

      items.push({
        hash: link.url,
        title: linkText,
      })
    } else if (child.type === "list") {
      items.push(...processItems(child.children))
    }
  }

  return items
}
