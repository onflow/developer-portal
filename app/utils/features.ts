import { redirect } from "@remix-run/node"

/**
 * @see https://github.com/onflow/next-docs-v1/issues/260
 */
export function temporarilyRedirectToComingSoon() {
  throw redirect(`/coming-soon`)
}
