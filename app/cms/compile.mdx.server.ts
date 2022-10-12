import remarkEmbedder, { RemarkEmbedderOptions } from "@remark-embedder/core"
import oembedTransformer from "@remark-embedder/transformer-oembed"
import { bundleMDX } from "mdx-bundler"
import path from "node:path"
import type TPQueue from "p-queue"
import calculateReadingTime from "reading-time"
import type * as U from "unified"
import type { GitHubTextFile } from "./github.server"
import { extractUrls, UrlItem } from "./rehype-plugins/extractUrls"
import { generateToc, TocItem } from "./rehype-plugins/generateToc"
import { removeExcludedContent } from "./rehype-plugins/removeExcludedContent"
import { removeMdxMarker } from "./rehype-plugins/removeMdxMarker"
import { removePreContainerDivs } from "./rehype-plugins/removePreContainerDivs"
import { replaceNonStandardReactAttributes } from "./rehype-plugins/replaceNonStandardReactAttributes"

if (process.platform === "win32") {
  process.env.ESBUILD_BINARY_PATH = path.resolve(
    process.cwd(),
    "../../../node_modules/esbuild/bin/esbuild.exe"
  )
} else {
  process.env.ESBUILD_BINARY_PATH = path.resolve(
    process.cwd(),
    "../../../node_modules/esbuild/bin/esbuild"
  )
}

function handleEmbedderError({ url }: { url: string }) {
  return `<p>Error embedding <a href="${url}">${url}</a>.`
}

async function compileMdx<FrontmatterType extends Record<string, unknown>>(
  source: Pick<GitHubTextFile, "path" | "textContent">,
  files: Array<Pick<GitHubTextFile, "path" | "textContent">>
) {
  const { default: remarkSlug } = await import("remark-slug")
  const { default: gfm } = await import("remark-gfm")

  const rootDir = path.posix.dirname(source.path)
  const toc = [] as TocItem[]
  const urls = [] as UrlItem[]

  try {
    const { frontmatter, code } = await bundleMDX({
      source: source.textContent,
      files: files.reduce(
        (prev, current) => ({
          ...prev,
          [current.path.replace(rootDir, "./")]: current.textContent,
        }),
        {
          [source.path]: source.textContent,
        }
      ),
      mdxOptions(options) {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          gfm,
          remarkSlug,
          [
            remarkEmbedder,
            {
              handleError: handleEmbedderError,
              transformers: [oembedTransformer],
            },
          ] as U.Pluggable<RemarkEmbedderOptions[]>,
        ]
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          removePreContainerDivs,
          removeMdxMarker,
          replaceNonStandardReactAttributes,
          removeExcludedContent,
          generateToc(toc, { maxDepth: 2 }),
          extractUrls(urls),
        ]

        return options
      },
    })

    const readTime = calculateReadingTime(source.textContent)

    return {
      code,
      readTime,
      frontmatter: frontmatter as FrontmatterType,
      urls,
      toc,
    }
  } catch (error: unknown) {
    console.error(`Compilation error for slug: `, source.path)
    throw error
  }
}

let _queue: TPQueue | null = null
async function getQueue() {
  const { default: PQueue } = await import("p-queue")
  if (_queue) return _queue
  _queue = new PQueue({ concurrency: 1 })
  return _queue
}

// We have to use a queue because we can't run more than one of these at a time
// or we'll hit an out of memory error because esbuild uses a lot of memory...
async function queuedCompileMdx<
  FrontmatterType extends Record<string, unknown>
>(...args: Parameters<typeof compileMdx>) {
  const queue = await getQueue()
  const result = await queue.add(() => compileMdx<FrontmatterType>(...args))
  return result
}

export type MdxFrontmatter = {
  // archived?: boolean;
  draft?: boolean
  title?: string
  description?: string
  date?: string
  // meta?: {
  //   keywords?: Array<string>;
  // };

  // Post meta
  // categories?: Array<string>;
  // bannerBlurDataUrl?: string;
  // bannerCloudinaryId?: string;
  // bannerCredit?: string;
  // bannerAlt?: string;
  // bannerTitle?: string;
  // socialImageTitle?: string;
  // socialImagePreTitle?: string;
  showToc?: boolean
  // translations?: Array<{
  //   language: string;
  //   link: string;
  //   author?: {
  //     name: string;
  //     link?: string;
  //   };
  // }>;
}

export type ReadTime = {
  text: string
  minutes: number
  time: number
  words: number
}

type MdxPage = {
  code: string

  readTime?: ReturnType<typeof calculateReadingTime>

  /**
   * The underlying github file that was used to generate the page.
   */
  origin: GitHubTextFile

  /**
   * It's annoying that all these are set to optional I know, but there's
   * no great way to ensure that the MDX files have these properties,
   * especially when a common use case will be to edit them without running
   * the app or build. So we're going to force you to handle situations when
   * these values are missing to avoid runtime errors.
   */
  frontmatter: MdxFrontmatter

  urls: UrlItem[]

  toc?: TocItem[]
}

/**
 * This is a separate type from MdxPage because the code string is often
 * pretty big and the pages that simply list the pages shouldn't include the code.
 */
type MdxListItem = Omit<MdxPage, "code">

export { queuedCompileMdx as compileMdx }
export type { MdxPage, MdxListItem }
