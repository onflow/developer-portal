import { redirects } from "../../data/redirects"

export function returnRedirectForRoute(path: string) {
  const hashPath = path?.split("#")[1]
  if (hashPath) {
    const result = redirects[path]
      ? redirects[path] + "#" + hashPath
      : redirects[path]

    return result
  }

  return redirects[path]
}
