import { isLinkExternal } from "~/ui/design-system/src/lib/utils/isLinkExternal"
import { DocCollection } from "../doc-collections/types"
import { LinkItem } from "../rehype-plugins/extractLinks"
import { validateLinkExternal } from "./validate-link-external"
import { validateLinkInternal } from "./validate-link-internal"

export type ValidatedLinkType =
  | "external"
  | "internal"
  | "mailto"
  | "hash"
  | "unknown"

export type ValidatedLinkStatusFailure = "invalid"
export type ValidatedLinkStatusWarning = "warning" | "unknown"
export type ValidatedLinkStatusSuccess = "ok" | "ignored"

export type ValidatedLinkStatus =
  | ValidatedLinkStatusFailure
  | ValidatedLinkStatusWarning
  | ValidatedLinkStatusSuccess

export interface ValidatedLink extends LinkItem {
  type: ValidatedLinkType
  hint?: string
  result: ValidatedLinkStatus
}

export interface ValidatedLinkFailure extends ValidatedLink {
  result: ValidatedLinkStatusFailure
}
export interface ValidatedLinkWarning extends ValidatedLink {
  result: ValidatedLinkStatusWarning
}
export interface ValidatedLinkSuccess extends ValidatedLink {
  result: ValidatedLinkStatusSuccess
}

export const isValidatedLinkFailure = (
  link: ValidatedLink
): link is ValidatedLinkFailure => link.result == "invalid"

export const isValidatedLinkWarning = (
  link: ValidatedLink
): link is ValidatedLinkWarning =>
  link.result == "warning" || link.result === "unknown"

export const isValidatedLinkSuccess = (
  link: ValidatedLink
): link is ValidatedLinkSuccess =>
  link.result == "ok" || link.result === "ignored"

export type ValidateLinkContext = {
  rootRelativePath: string
  validRelativeFileUrls: string[]
  collection: DocCollection
}

/**
 * Returns a `ValidatedLink` from a `LinKItem`
 * @param item The link to validate
 * @param context Additional context that may be needed for validation.
 * @returns
 */
export const validateLink = async (
  item: LinkItem,
  context: ValidateLinkContext
): Promise<ValidatedLink> => {
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
    return validateLinkExternal(item, context)
  }

  return validateLinkInternal(item, context)
}
