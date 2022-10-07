import { ensure } from "errorish"
import linkCheck, { LinkCheckResult } from "link-check"
import { LinkItem } from "../rehype-plugins/extractLinks"
import { ValidatedLink, ValidateLinkContext } from "./validate-link"

/**
 * An array of RegExp's to match against a URL's hostname
 * that indicates we should ignore the URL and not test it's response.
 */
const IGNORED_HOSTNAMES = [/^(.+\.)?localhost/, /^(.+\.)?example.com/]

const shouldIgnore = (href: string) => {
  try {
    const { hostname } = new URL(href)
    return IGNORED_HOSTNAMES.some((regex) => regex.test(hostname))
  } catch (_) {
    // Should we return true so we don't make an unnecessary request?
  }

  return false
}

export const validateLinkExternal = async (
  item: LinkItem,
  _: ValidateLinkContext
): Promise<ValidatedLink> => {
  const { href } = item

  if (shouldIgnore(href)) {
    return {
      ...item,
      type: "external",
      result: "ignored",
      hint: "Links with this hostname are not checked",
    }
  }

  try {
    const result = await new Promise<LinkCheckResult>((resolve, reject) => {
      linkCheck(
        href,
        {
          aliveStatusCodes: [/^2\d\d$/],
          user_agent: "FlowLinkChecker/1.0",
          retryOn429: true,
          fallbackRetryDelay: "20s",
        },
        (linkCheckErr, linkCheckResult) => {
          if (linkCheckResult !== null) {
            return resolve(linkCheckResult)
          }
          reject(linkCheckErr)
        }
      )
    })

    if (result.status === "alive") {
      return {
        ...item,
        type: "external",
        result: "ok",
      }
    }

    return {
      ...item,
      type: "external",
      result: result.statusCode === 404 ? "invalid" : "warning",
      hint: `Link returned status ${result.statusCode} ${result.err || ""}`,
    }
  } catch (error) {
    return {
      ...item,
      type: "external",
      result: "invalid",
      hint: `Checking link failed with error: ${ensure(error).message}`,
    }
  }
}
