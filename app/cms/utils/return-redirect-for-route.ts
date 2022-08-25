import { redirects } from "../../data/redirects"

export function returnRedirectForRoute(path: string) {
  const hashPath = path.split("#")[1]
  if (hashPath) {
    return redirects[path] ? redirects[path] + "#" + hashPath : redirects[path]
  }
  return redirects[path]
}
