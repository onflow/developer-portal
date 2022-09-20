import { redirects } from "../../data/redirects"

export function returnRedirectForRoute(path: string) {
  console.log("Searching for redirect...")
  const hashPath = path.split("#")[1]
  if (hashPath) {
    console.log("Request includes hash...", hashPath, path)
    const result = redirects[path]
      ? redirects[path] + "#" + hashPath
      : redirects[path]
    console.log("Got result:", result)
    return result
  }
  console.log("Got result:", redirects[path])
  return redirects[path]
}
