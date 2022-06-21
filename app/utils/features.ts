import { redirect } from "@remix-run/node"

/**
 * @see https://github.com/onflow/next-docs-v1/issues/260
 */
export function temporarilyRedirectToComingSoon() {
  // alternatively: allow these pages to load in dev
  // if (process.env.NODE_ENV === "production") {
  //   throw redirect(`/coming-soon`)
  // }
  throw redirect(`/coming-soon`)
}
