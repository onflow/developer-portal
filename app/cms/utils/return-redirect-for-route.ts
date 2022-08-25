import { redirects } from "../../data/redirects"

export function returnRedirectForRoute(path: string) {
  return redirects[path]
}
