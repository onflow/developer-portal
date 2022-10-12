import { isLinkExternal } from "~/ui/design-system/src/lib/utils/isLinkExternal"
import { DocCollection } from "../doc-collections/types"
import { UrlItem } from "../rehype-plugins/extractUrls"
import { validateUrlExternal } from "./validate-url-external"
import { validateUrlInternal } from "./validate-url-internal"

export type ValidatedUrlType =
  /** An absolute external-facing url (i.e. https://www.example.com) */
  | "external"
  /** A relative URL to internal content */
  | "internal"
  /** A `mailto:someone@somewhere.com` URL. */
  | "mailto"
  /** A hash reference to another location within the page. */
  | "hash"
  /**  Any other/umidentified type of URL */
  | "unknown"

export type ValidatedUrlStatusFailure = "invalid"
export type ValidatedUrlStatusWarning = "warning" | "unknown"
export type ValidatedUrlStatusSuccess = "ok" | "ignored"

export type ValidatedUrlStatus =
  | ValidatedUrlStatusFailure
  | ValidatedUrlStatusWarning
  | ValidatedUrlStatusSuccess

export interface ValidatedUrl extends UrlItem {
  type: ValidatedUrlType
  hint?: string
  result: ValidatedUrlStatus
}

export interface ValidatedUrlFailure extends ValidatedUrl {
  result: ValidatedUrlStatusFailure
}
export interface ValidatedUrlWarning extends ValidatedUrl {
  result: ValidatedUrlStatusWarning
}
export interface ValidatedUrlSuccess extends ValidatedUrl {
  result: ValidatedUrlStatusSuccess
}

export const isValidatedUrlFailure = (
  link: ValidatedUrl
): link is ValidatedUrlFailure => link.result == "invalid"

export const isValidatedUrlWarning = (
  link: ValidatedUrl
): link is ValidatedUrlWarning =>
  link.result == "warning" || link.result === "unknown"

export const isValidatedUrlSuccess = (
  link: ValidatedUrl
): link is ValidatedUrlSuccess =>
  link.result == "ok" || link.result === "ignored"

export type ValidateUrlContext = {
  rootRelativePath: string
  validRelativeFileUrls: string[]
  collection: DocCollection
}

/**
 * Returns a `ValidatedUrl` from a `LinKItem`
 * @param item The link to validate
 * @param context Additional context that may be needed for validation.
 * @returns
 */
export const validateUrl = async (
  item: UrlItem,
  context: ValidateUrlContext
): Promise<ValidatedUrl> => {
  const { href } = item

  if (href.toLowerCase().startsWith("mailto:")) {
    return {
      ...item,
      type: "mailto",
      result: "ignored",
    }
  }

  if (href.startsWith("#")) {
    return {
      ...item,
      type: "hash",
      result: "ignored",
    }
  }

  if (isLinkExternal(href)) {
    return validateUrlExternal(item, context)
  }

  return validateUrlInternal(item, context)
}
