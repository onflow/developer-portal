import fromMarkdown from "mdast-util-from-markdown"

import { toc } from "mdast-util-toc"

import get from "lodash/get"

// NOTE: gets the relavent information we need to build the
// table of contents from the mdast.
export const generateTOC = (mdContent: any) => {
  const TOC = toc(mdContent)
  return get(TOC, "map.children").map((el: any) => ({
    title: get(el, "children[0].children[0].children[0].value"),
    // url: get(el, "children[0].children[0].url"),
  }))
}
