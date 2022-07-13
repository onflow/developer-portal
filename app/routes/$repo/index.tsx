import { ActionFunction, redirect } from "@remix-run/node"
import invariant from "tiny-invariant"

export { default, CatchBoundary, loader } from "./$"

export const action: ActionFunction = async ({ params, request }) => {
  const repo = params.repo
  invariant(repo, `expected repo param`)
  const body = await request.formData()
  const version = body.get("version")
  invariant(version, `expected version param`)
  return redirect(`/${repo}/version/${version}`)
}
