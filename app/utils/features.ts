import { redirect } from "@remix-run/node"

/**
 * @see https://github.com/onflow/next-docs-v1/issues/260
 */
export function temporarilyRedirectToComingSoon() {
  const isPreview = process.env.INCOMPLETE_PAGE_BEHAVIOR === "preview" // allow envs like staging to preview incomplete pages

  if (!isPreview) {
    throw redirect(`/coming-soon`)
  }
}
