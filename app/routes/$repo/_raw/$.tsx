import { LoaderFunction } from "@remix-run/node"
import invariant from "tiny-invariant"
import { octokit } from "~/cms"
import { getContentSpec } from "~/constants/repos"

const knownExtensions: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
}

export const loader: LoaderFunction = async ({ params }) => {
  const path = params["*"]
  invariant(params.repo)
  invariant(path)

  const contentSpec = getContentSpec(params.repo)
  if (!contentSpec) {
    throw new Response("Not Found", {
      status: 404,
    })
  }

  const matchingExtension = Object.entries(knownExtensions).find(([ext]) =>
    path.endsWith(ext)
  )

  if (!matchingExtension) {
    throw new Response("Not Found", {
      status: 404,
    })
  }

  const [, contentType] = matchingExtension

  const file = await octokit.repos.getContent({
    owner: contentSpec.owner,
    repo: contentSpec.repoName,
    path: `${contentSpec.basePath}/${path}`,
  })

  invariant(!Array.isArray(file.data), `did not expect array`)
  invariant("encoding" in file.data)
  invariant(file.data.encoding === "base64", `expected base64`)

  throw new Response(Buffer.from(file.data.content, file.data.encoding), {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "max-age=300",
    },
  })
}
