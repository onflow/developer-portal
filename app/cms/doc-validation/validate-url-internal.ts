import { distance } from "fastest-levenshtein"
import { posix } from "node:path"
import { stripMarkdownExtension } from "../../ui/design-system/src/lib/utils/stripMarkdownExtension"
import { UrlItem } from "../rehype-plugins/extractUrls"
import { stripSlahes } from "../utils/strip-slashes"
import { ValidatedUrl, ValidateUrlContext } from "./validate-url"
import { validateUrlExternal } from "./validate-url-external"

const PLACEHOLDER_ORIGIN = "https://example.com"
const SITE_ROOT =
  process.env.SITE_ROOT_ORIGIN || "https://flow-docs-staging.fly.dev"

export const normalizeRelativeUrl = (path: string) =>
  stripSlahes(stripMarkdownExtension(path.toLowerCase()))

export const validateUrlInternal = async (
  item: UrlItem,
  context: ValidateUrlContext
): Promise<ValidatedUrl> => {
  const { href } = item
  const { rootRelativePath, validRelativeFileUrls } = context

  // Still need to handle relative links that point outside of the root folder.
  if (href.startsWith("/")) {
    const targetUrl = `${SITE_ROOT}${href}`
    const checkItem = {
      ...item,
      href: targetUrl,
    }
    return validateUrlExternal(checkItem, context)
  }
  // We need to extract the current directory of the incoming file for validation,
  // in order to correctly validate relative links.
  const pathSegments = rootRelativePath.split("/")
  pathSegments.pop() // Remove the filename, we only want the path of the containing folder.
  let containingFolder = pathSegments.join("/")

  const resolved = posix.resolve(
    "/",
    containingFolder ? `/${containingFolder}` : "",
    href
  )

  const normalizedHref = normalizeRelativeUrl(resolved)

  // Cleanup the URL for validation; removes hashes, validating hases is currently out-of-scope.
  const { pathname } = new URL(normalizedHref, PLACEHOLDER_ORIGIN)

  const validInternalURL = validRelativeFileUrls.includes(
    pathname.replace(/^\/+/g, "") // Remove leading slash.
  )

  return {
    ...item,
    type: "internal",
    result: validInternalURL ? "ok" : "invalid",
    hint: getInternalLinkHint(item, { ...context, normalizedHref }),
  }
}

type GetInternalLinkHintContext = ValidateUrlContext & {
  normalizedHref: string
}

/**
 * Tries to make an educated guess about what the user was trying to link to and/or offer some additional guidance about how to correct the link.
 */
function getInternalLinkHint(
  { href }: UrlItem,
  {
    validRelativeFileUrls,
    collection,
    normalizedHref,
  }: GetInternalLinkHintContext
): string | undefined {
  // Use the levenshtein distance to suggest possible URLs within the
  // current collection that may have been the intended target.
  const closest = validRelativeFileUrls
    .map((url) => ({
      url,
      levenshtein: distance(url, normalizedHref),
    }))
    .sort((a, b) => a.levenshtein - b.levenshtein)[0]

  // 20 is somewhat-arbitrary. I chose it based on looking at the output from
  // various inputs, but we may want to adjust this after guaging it's
  // usefulness in real world scenarios.
  if (closest && closest.levenshtein < 20) {
    return `Did you mean \`${closest.url}\`?`
  }

  // If we don't hsave something close, check for a backslash which indicates
  // they may have been incorrectly referencing a URL outside of the doc collection
  // REVISIT: should this be prioritized over similar URLs?
  if (href.startsWith("/")) {
    const { rootPath } = collection.source
    const strippedHref = stripSlahes(href)
    return `This looks like an absolute path. If you are linking to a relative file in the same doc collection (within \`${rootPath}\`) then you should use a relative path (Maybe you meant \`${strippedHref}\`?). If you're referencing a link external to this doc collection (outside of \`${rootPath}\`) you should use an absolute URL (Maybe you meant \`https://developers.flow.com/${strippedHref}\`?)`
  }

  // Next try: see if we have a value URL that is a substring of the incorrect
  // URL, or vice-versa - maybe they mistyped?
  const possibleUrl =
    validRelativeFileUrls.find((url) => normalizedHref.includes(url)) ||
    validRelativeFileUrls.find((url) => url.includes(normalizedHref))

  if (possibleUrl) {
    return `Did you mean \`${possibleUrl}\`?`
  }

  // Last resort - suggest _something_ if we can, even if it's wildly different
  // REVISIT: should we just skip this?
  if (closest) {
    return `Did you mean \`${closest.url}\`?`
  }

  return undefined
}
