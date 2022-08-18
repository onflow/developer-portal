import redirects from "../../redirects.js"

export function returnRedirectForRoute(path: string): string {
  console.log("Searching for redirect for", path)
  // @ts-expect-error
  return redirects[path] ?? path
}

export function returnRedirectForRouteOrNull(path: string): string | undefined {
  console.log("Searching for redirect for", path)
  // @ts-expect-error
  return redirects[path]
}
