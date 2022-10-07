import { posix } from "node:path"
import { stripMarkdownExtension } from "../../ui/design-system/src/lib/utils/stripMarkdownExtension"
import { LinkItem } from "../rehype-plugins/extractLinks"
import { stripSlahes } from "../utils/strip-slashes"
import { ValidatedLink, ValidateLinkContext } from "./validate-link"

const PLACEHOLDER_ORIGIN = "https://example.com"

export const normalizeRelativeUrl = (path: string) =>
  stripSlahes(stripMarkdownExtension(path.toLowerCase()))

export const validateLinkInternal = async (
  item: LinkItem,
  context: ValidateLinkContext
): Promise<ValidatedLink> => {
  const { href } = item

  const { rootRelativePath, validRelativeFileUrls } = context

  // This ensures we strip out any query strings or hashes (we can
  // verify hashes another time)
  const { pathname } = new URL(href, PLACEHOLDER_ORIGIN)

  // resolve the path relative to the file's root path, but excluding
  // the source's root path (which we cannot "break out" of)
  const resolved = posix.resolve("/", rootRelativePath, pathname)
  const normalizedHref = normalizeRelativeUrl(resolved)

  return {
    ...item,
    type: "internal",
    result: validRelativeFileUrls.includes(normalizedHref) ? "ok" : "invalid",
    hint: getInternalLinkHint(item, { ...context, normalizedHref }),
  }
}

type GetInternalLinkHintContext = ValidateLinkContext & {
  normalizedHref: string
}

/**
 * Tries to make an educated guess about what the user was trying to link to and/or offer some additional guidance about how to correct the link.
 */
function getInternalLinkHint(
  { href }: LinkItem,
  {
    validRelativeFileUrls,
    collection,
    normalizedHref,
  }: GetInternalLinkHintContext
): string | undefined {
  const possibleUrl = validRelativeFileUrls.find((url) =>
    normalizedHref.includes(url)
  )

  if (possibleUrl) {
    return `Did you mean \`${possibleUrl}\`?`
  }

  if (href.startsWith("/")) {
    const { rootPath } = collection.source
    const strippedHref = stripSlahes(href)
    return `This looks like an absolute path. If you are linking to a relative file in the same doc collection (within \`${rootPath}\`) then you should use a relative path (Maybe you meant \`${strippedHref}\`?). If you're referencing a link external to this doc collection (outside of \`${rootPath}\`) you should use an absolute URL (Maybe you meant \`https://developers.flow.com/${strippedHref}\`?)`
  }

  return undefined
}
