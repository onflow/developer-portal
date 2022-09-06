/* eslint-disable react/jsx-no-undef */
import { getMDXComponent } from "mdx-bundler/client"
import React from "react"
import type { LinkProps } from "react-router-dom"
import calculateReadingTime from "reading-time"
import type { GitHubTextFile, MdxPage, Timings } from "~/cms"
import {
  AttributionData,
  cachified,
  compileMdx,
  downloadMarkdown,
  redisCache,
} from "~/cms"
import {
  Attribution,
  Heading,
  HeadingProps,
  InputProps,
  InternalCodeblock,
  InternalContentLink,
  LargeVideoCard,
  StaticCheckbox,
} from "~/ui/design-system"
import { DocCollectionSource } from "../../cms/doc-collections.server"
import { InternalImg } from "../../ui/design-system/src/lib/Components/InternalImg/InternalImg"
import { documentCompiledKey, documentDownloadKey } from "../cache-keys.server"
import { NotFoundError } from "../errors/not-found-error"
import { returnRedirectForRoute } from "./return-redirect-for-route"
import { Theme, useTheme } from "./theme.provider"

type CachifiedOptions = {
  forceFresh?: boolean | string
  request?: Request
  timings?: Timings
  maxAge?: number
  expires?: Date
}

const defaultMaxAge = 1000 * 60 * 60 * 24 * 30

const checkCompiledValue = (value: unknown) =>
  typeof value === "object" &&
  (value === null || ("code" in value && "frontmatter" in value))

export async function getMdxPage(
  {
    source,
    path,
  }: {
    source: DocCollectionSource
    path: string
  },
  options: CachifiedOptions
): Promise<MdxPage | null> {
  const key = documentCompiledKey(source, path)
  const page = await cachified({
    cache: redisCache,
    maxAge: defaultMaxAge,
    ...options,
    // reusing the same key as compiledMdxCached because we just return that
    // exact same value. Cachifying this allows us to skip getting the cached files
    key,
    checkValue: checkCompiledValue,
    getFreshValue: async () => {
      try {
        const result = await downloadMarkdownCached(source, path, options)
        if (result == null) return null

        const compiledPage = await compileMdxCached({
          source,
          fileOrDirPath: path,
          file: result.file,
          files: result.files,
          options,
        }).catch((err) => {
          console.error(`Failed to get a fresh value for mdx:`, {
            source,
            path,
          })
          return Promise.reject(err)
        })

        return compiledPage
          ? {
              ...compiledPage,
              origin: result.file,
            }
          : null
      } catch (er) {
        if (er instanceof NotFoundError) {
          return null
        } else {
          throw er
        }
      }
    },
  })

  if (!page) {
    // if there's no page, let's remove it from the cache
    void redisCache.del(key)
  }

  return page
}

async function downloadMarkdownCached(
  source: DocCollectionSource,
  fileOrDirPath: string,
  options: CachifiedOptions
) {
  const key = documentDownloadKey(source, fileOrDirPath)
  const downloaded = await cachified({
    cache: redisCache,
    maxAge: defaultMaxAge,
    ...options,
    key,
    checkValue: (value: unknown) => {
      if (typeof value !== "object") {
        return `value is not an object`
      }

      // TODO: better validation!

      // const download = value as Record<string, unknown>
      // // if (!Array.isArray(download.files)) {
      // //   return `value.files is not an array`
      // // }
      // if (typeof download.entry !== "string") {
      //   return `value.entry is not a string`
      // }

      return true
    },
    getFreshValue: async () => {
      try {
        return await downloadMarkdown(source, fileOrDirPath)
      } catch (er) {
        if (er instanceof NotFoundError) {
          return null
        } else {
          throw er
        }
      }
    },
  })

  return downloaded
}

async function compileMdxCached({
  source,
  fileOrDirPath,
  file,
  files,
  options,
}: {
  source: DocCollectionSource
  fileOrDirPath: string
  file: GitHubTextFile
  files: Array<GitHubTextFile>
  options: CachifiedOptions
}) {
  const key = documentCompiledKey(source, fileOrDirPath)
  const page = await cachified({
    cache: redisCache,
    maxAge: defaultMaxAge,
    ...options,
    key,
    checkValue: checkCompiledValue,
    getFreshValue: async () => {
      const compiledPage = await compileMdx<MdxPage["frontmatter"]>(file, files)
      return compiledPage
    },
  })
  // if there's no page, remove it from the cache
  if (!page) {
    void redisCache.del(key)
  }
  return page
}

function stripExtension(href: string) {
  const stripped = href.replace(/(.md|.mdx)/, "")
  return stripped
}

function GetMdxComponents(theme: Theme) {
  return {
    a: (props: LinkProps & { href: string }) => {
      const { href, ...rest } = props
      return (
        <InternalContentLink
          {...rest}
          href={stripExtension(returnRedirectForRoute(href) ?? href)}
          className="not-prose"
        />
      )
    },
    input: (props: InputProps) =>
      props.type === "checkbox" ? (
        <StaticCheckbox
          {...props}
          asInternalChecklist={true}
          className="not-prose"
        />
      ) : (
        <input {...props} />
      ),
    h1: (props: HeadingProps) => <Heading type="h1" {...props} />,
    h2: (props: HeadingProps) => <Heading type="h2" {...props} />,
    h3: (props: HeadingProps) => <Heading type="h3" {...props} />,
    h4: (props: HeadingProps) => <Heading type="h4" {...props} />,
    h5: (props: HeadingProps) => <Heading type="h5" {...props} />,
    h6: (props: HeadingProps) => <Heading type="h6" {...props} />,
    pre: ({ children }: { className: string; children: JSX.Element }) => {
      return (
        <InternalCodeblock
          children={children}
          theme={theme}
          autoHeight={true}
          className="not-prose"
        />
      )
    },
    Callout: (props: React.PropsWithChildren<{}>) => (
      <div>{props.children}</div>
    ),
    Img: InternalImg,
    img: InternalImg,
    iframe: (props: React.PropsWithRef<{ src: string; title: string }>) => {
      const { src, title, ...rest } = props
      return (
        <LargeVideoCard
          link={src}
          title={title}
          length={0}
          {...rest}
          className="not-prose"
        />
      )
    },
  }
}

function InternalAttribution({
  attributionData,
  readTime,
}: {
  attributionData: AttributionData
  readTime?: ReturnType<typeof calculateReadingTime>
}) {
  const updatedDate = attributionData?.lastCommit.committerDate
  const lastUpdatedAuthorName = attributionData?.lastCommit.author.login
  const lastCommitUrl = attributionData?.lastCommit.htmlUrl
  if (
    !attributionData ||
    !updatedDate ||
    !lastUpdatedAuthorName ||
    !lastCommitUrl
  )
    return null

  return (
    <Attribution
      updatedDate={updatedDate}
      authorName={lastUpdatedAuthorName}
      authorIcon={attributionData.lastCommit.author.gravatar_url}
      otherAuthorsCount={attributionData.otherContributorsCount}
      commitUrl={lastCommitUrl}
      readMinutes={readTime?.minutes}
    />
  )
}

/**
 * This should be rendered within a useMemo
 * @param code the code to get the component from
 * @returns the component
 */
function getMdxComponent(page: MdxPage, theme: Theme | null) {
  const { code, frontmatter } = page
  const Component = getMDXComponent(code, frontmatter)

  function MdxComponent({
    components,
    ...rest
  }: Parameters<typeof Component>["0"]) {
    const { attributionData } = page.origin
    return (
      <div className="mdx-content prose dark:prose-invert">
        {!!frontmatter.title && (
          <header>
            <Heading type="h1" children={frontmatter.title} />
          </header>
        )}

        {!!attributionData && (
          <div className="not-prose">
            <InternalAttribution
              attributionData={attributionData}
              readTime={page.readTime}
            />
          </div>
        )}

        {!!frontmatter.description && <p>{frontmatter.description}</p>}

        <Component
          /* @ts-expect-error: Does not like the link tage type definition above */
          components={GetMdxComponents(theme)}
          {...rest}
        />
      </div>
    )
  }
  return MdxComponent
}

export function useMdxComponent(page: MdxPage) {
  const [theme] = useTheme()
  return React.useMemo(() => getMdxComponent(page, theme), [page, theme])
}
