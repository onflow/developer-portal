import { NotFoundError } from "../errors/not-found-error"
import { UnknownEncoding } from "../errors/unknown-encoding"
import { octokit } from "./octokit.server"

export type DownloadFileBaseOptions = {
  owner: string
  repo: string
}

export type DownloadFileByPathOptions = DownloadFileBaseOptions & {
  path: string
  ref: string
}
export type DownloadFileByShaOptions = DownloadFileBaseOptions & { sha: string }

export type DownloadFileOptions =
  | DownloadFileByPathOptions
  | DownloadFileByShaOptions

/**
 * Downloads a file from github either by SHA hash or by path + ref.
 */
export async function downloadFile({
  owner,
  repo,
  ...rest
}: DownloadFileOptions) {
  let content: string
  let encoding: string
  let url: string

  if ("sha" in rest) {
    const { data } = await octokit.request(
      "GET /repos/{owner}/{repo}/git/blobs/{file_sha}",
      {
        owner,
        repo,
        file_sha: rest.sha,
      }
    )
    content = data.content
    encoding = data.encoding
    url = data.url
  } else {
    const { data } = await octokit.repos.getContent({
      ...rest,
      owner,
      repo,
    })

    if (Array.isArray(data)) {
      throw new NotFoundError(
        rest.path,
        `Path was a directory, but expected a file: ${rest.path}`
      )
    }

    if (!("encoding" in data)) {
      throw new UnknownEncoding(
        rest.path,
        undefined,
        `Content of type "${data.type}" at URL "${data.url}" does not specify an encoding`
      )
    }

    content = data.content
    encoding = data.encoding
    url = data.url
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new UnknownEncoding(url, encoding)
  }

  return Buffer.from(content, encoding)
}
