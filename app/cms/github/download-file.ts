import { NotFoundError } from "../errors/not-found-error"
import { UnknownEncoding } from "../errors/unknown-encoding"
import { octokit } from "./octokit.server"

export type DownloadFileOptions = {
  owner: string
  repo: string
  ref: string
  path: string
}

/**
 * Downloads a file from a Github and returns it as a Buffer.
 */
export const downloadFile = async ({
  owner,
  repo,
  ref,
  path,
}: DownloadFileOptions) => {
  const { data } = await octokit.repos.getContent({
    owner,
    repo,
    ref,
    path,
  })

  if (Array.isArray(data)) {
    throw new NotFoundError(
      path,
      `Path was a directory, but expected a file: ${path}`
    )
  }

  if (!("encoding" in data)) {
    throw new UnknownEncoding(
      path,
      undefined,
      `Content of type "${data.type}" at URL "${data.url}" does not specify an encoding`
    )
  }

  if (!Buffer.isEncoding(data.encoding)) {
    throw new UnknownEncoding(data.url, data.encoding)
  }

  return Buffer.from(data.content, data.encoding)
}
