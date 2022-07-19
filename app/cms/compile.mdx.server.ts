import remarkEmbedder from "@remark-embedder/core"
import oembedTransformer from "@remark-embedder/transformer-oembed"
import type * as H from "hast"
import { bundleMDX } from "mdx-bundler"
import type TPQueue from "p-queue"
import path from "path"
import calculateReadingTime from "reading-time"
import rehypeSanitize, { defaultSchema } from "rehype-sanitize"
import type * as U from "unified"
import { visit } from "unist-util-visit"
import type { GitHubFile } from "./github.server"
import { HIGHLIGHT_LANGUAGES } from "~/cms/constants"
import { formatLinks } from "~/cms/utils/format-links"
import { markdownToToc } from "./utils/generate-toc"

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

function removePreContainerDivs() {
  return async function preContainerDivsTransformer(tree: H.Root) {
    visit(
      tree,
      { type: "element", tagName: "pre" },
      function visitor(node, index, parent) {
        if (parent?.type !== "element") return
        if (parent.tagName !== "div") return
        if (parent.children.length !== 1 && index === 0) return
        Object.assign(parent, node)
      }
    )
  }
}

const remarkPlugins: U.PluggableList = [
  [
    // @ts-expect-error 🤷‍♂️
    remarkEmbedder,
    {
      handleError: handleEmbedderError,
      transformers: [oembedTransformer],
    },
  ],
]

const rehypePlugins = (
  repoName: string,
  isTrusted: boolean = false
): U.PluggableList => {
  const plugins: U.PluggableList = [
    removePreContainerDivs,
    () => formatLinks(repoName),
  ]

  if (!isTrusted) {
    plugins.push([
      rehypeSanitize,
      {
        ...defaultSchema,
        attributes: {
          ...defaultSchema.attributes,
          code: [
            ...(defaultSchema?.attributes?.code || []),
            [
              "className",
              ...HIGHLIGHT_LANGUAGES.map((name) => `language-${name}`),
            ],
          ],
        },
      },
    ])
  }

  return plugins
}

async function compileMdx<FrontmatterType extends Record<string, unknown>>(
  slug: string,
  githubFiles: Array<GitHubFile>,
  repoName: string,
  isTrusted: boolean = false
) {
  const { default: remarkSlug } = await import("remark-slug")
  const { default: gfm } = await import("remark-gfm")
  const indexRegex = new RegExp(`${slug}\\/index.mdx?$`)
  const indexFile = githubFiles.find(({ path }) => indexRegex.test(path))

  if (!indexFile) return null

  const rootDir = indexFile.path.replace(/index.mdx?$/, "")
  const relativeFiles: Array<GitHubFile> = githubFiles.map(
    ({ path, content }) => ({
      path: path.replace(rootDir, "./"),
      content,
    })
  )
  const files = arrayToObj(relativeFiles, {
    keyName: "path",
    valueName: "content",
  })

  try {
    const { frontmatter, code } = await bundleMDX({
      source: indexFile.content,
      files,
      mdxOptions(options) {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          gfm,
          remarkSlug,
          ...remarkPlugins,
        ]
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          ...rehypePlugins(repoName, isTrusted),
        ]

        return options
      },
    })
    const readTime = calculateReadingTime(indexFile.content)
    const toc = markdownToToc(indexFile.content)

    return {
      code,
      readTime,
      frontmatter: frontmatter as FrontmatterType,
      toc,
    }
  } catch (error: unknown) {
    console.error(`Compilation error for slug: `, slug)
    throw error
  }
}

function arrayToObj<ItemType extends Record<string, unknown>>(
  array: Array<ItemType>,
  { keyName, valueName }: { keyName: keyof ItemType; valueName: keyof ItemType }
) {
  const obj: Record<string, ItemType[keyof ItemType]> = {}
  for (const item of array) {
    const key = item[keyName]
    if (typeof key !== "string") {
      throw new Error(`${String(keyName)} of item must be a string`)
    }
    const value = item[valueName]
    obj[key] = value
  }
  return obj
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

type MdxPage = {
  code: string
  // slug: string;
  editLink: string

  readTime?: ReturnType<typeof calculateReadingTime>

  /**
   * It's annoying that all these are set to optional I know, but there's
   * no great way to ensure that the MDX files have these properties,
   * especially when a common use case will be to edit them without running
   * the app or build. So we're going to force you to handle situations when
   * these values are missing to avoid runtime errors.
   */
  frontmatter: MdxFrontmatter
  toc?: any
}

/**
 * This is a separate type from MdxPage because the code string is often
 * pretty big and the pages that simply list the pages shouldn't include the code.
 */
type MdxListItem = Omit<MdxPage, "code">

export { queuedCompileMdx as compileMdx }
export type { MdxPage, MdxListItem }
