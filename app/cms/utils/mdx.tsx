/* eslint-disable react/jsx-no-undef */
import { Link as RemixLink } from "@remix-run/react"
import { getMDXComponent } from "mdx-bundler/client"
import React from "react"
import type { LinkProps } from "react-router-dom"
import type { GitHubFile, MdxListItem, MdxPage, Timings } from "~/cms"
import {
  cachified,
  compileMdx,
  downloadDirList,
  downloadMdxFileOrDirectory,
  redisCache,
} from "~/cms"
import {
  Heading,
  HeadingProps,
  InputProps,
  InternalCodeblock,
  LargeVideoCard,
  Link,
  StaticCheckbox,
} from "~/ui/design-system"
import type { LoaderData as RootLoaderData } from "../../root"
import { Theme, useTheme } from "./theme.provider"

function typedBoolean<T>(
  value: T
): value is Exclude<T, "" | 0 | false | null | undefined> {
  return Boolean(value)
}

type CachifiedOptions = {
  forceFresh?: boolean | string
  request?: Request
  timings?: Timings
  maxAge?: number
  expires?: Date
}

const defaultMaxAge = 1000 * 60 * 60 * 24 * 30

const getCompiledKey = (
  owner: string,
  repo: string,
  branch: string,
  path: string
) => `${owner}:${repo}:${branch}:${path}:compiled`

const checkCompiledValue = (value: unknown) =>
  typeof value === "object" &&
  (value === null || ("code" in value && "frontmatter" in value))

async function getMdxPage(
  {
    owner,
    repo,
    branch,
    fileOrDirPath,
  }: {
    owner: string
    repo: string
    branch: string
    fileOrDirPath: string
  },
  options: CachifiedOptions
): Promise<MdxPage | null> {
  const key = getCompiledKey(owner, repo, branch, fileOrDirPath)

  const page = await cachified({
    cache: redisCache,
    maxAge: defaultMaxAge,
    ...options,
    // reusing the same key as compiledMdxCached because we just return that
    // exact same value. Cachifying this allows us to skip getting the cached files
    key,
    checkValue: checkCompiledValue,
    getFreshValue: async () => {
      const pageFiles = await downloadMdxFilesCached(
        owner,
        repo,
        branch,
        fileOrDirPath,
        options
      )

      const compiledPage = await compileMdxCached({
        owner,
        repo,
        branch,
        fileOrDirPath,
        ...pageFiles,
        options,
      }).catch((err) => {
        console.error(`Failed to get a fresh value for mdx:`, {
          repo,
          fileOrDirPath,
        })
        return Promise.reject(err)
      })

      return compiledPage
    },
  })
  if (!page) {
    // if there's no page, let's remove it from the cache
    void redisCache.del(key)
  }
  return page
}

async function getMdxPagesInDirectory(
  owner: string,
  repo: string,
  branch: string,
  fileOrDirPath: string,
  options: CachifiedOptions
) {
  const dirList = await getMdxDirList(
    owner,
    repo,
    branch,
    fileOrDirPath,
    options
  )

  // our octokit throttle plugin will make sure we don't hit the rate limit
  const pageDatas = await Promise.all(
    dirList.map(async ({ slug }) => {
      return {
        ...(await downloadMdxFilesCached(
          owner,
          repo,
          branch,
          fileOrDirPath,
          options
        )),
        slug,
      }
    })
  )

  const pages = await Promise.all(
    pageDatas.map((pageData) =>
      compileMdxCached({
        owner,
        repo,
        branch,
        fileOrDirPath,
        ...pageData,
        options,
      })
    )
  )
  return pages.filter(typedBoolean)
}

const getDirListKey = (contentDir: string) => `${contentDir}:dir-list`

async function getMdxDirList(
  owner: string,
  repo: string,
  branch: string,
  fileOrDirPath: string,
  options?: CachifiedOptions
) {
  return cachified({
    cache: redisCache,
    maxAge: defaultMaxAge,
    ...options,
    key: getDirListKey(fileOrDirPath),
    checkValue: (value: unknown) => Array.isArray(value),
    getFreshValue: async () => {
      const dirList = (
        await downloadDirList(owner, repo, branch, fileOrDirPath)
      )
        .map(({ name, path }) => ({
          name,
          slug: path.replace(`${fileOrDirPath}/`, "").replace(/\.mdx$/, ""),
        }))
        .filter(({ name }) => name !== "README.md")
      return dirList
    },
  })
}

const getDownloadKey = (
  owner: string,
  repo: string,
  branch: string,
  fileOrDirPath: string
) => `${owner}:${repo}:${branch}:${fileOrDirPath}:downloaded`

async function downloadMdxFilesCached(
  owner: string,
  repo: string,
  branch: string,
  fileOrDirPath: string,
  options: CachifiedOptions
) {
  const key = getDownloadKey(owner, repo, branch, fileOrDirPath)
  const downloaded = await cachified({
    cache: redisCache,
    maxAge: defaultMaxAge,
    ...options,
    key,
    checkValue: (value: unknown) => {
      if (typeof value !== "object") {
        return `value is not an object`
      }
      if (value === null) {
        return `value is null`
      }

      const download = value as Record<string, unknown>
      if (!Array.isArray(download.files)) {
        return `value.files is not an array`
      }
      if (typeof download.entry !== "string") {
        return `value.entry is not a string`
      }

      return true
    },
    getFreshValue: async () =>
      downloadMdxFileOrDirectory(owner, repo, branch, fileOrDirPath),
  })
  // if there aren't any files, remove it from the cache
  if (!downloaded.files.length) {
    void redisCache.del(key)
  }
  return downloaded
}

async function compileMdxCached({
  owner,
  repo,
  branch,
  fileOrDirPath,
  entry,
  files,
  options,
}: {
  owner: string
  repo: string
  branch: string
  fileOrDirPath: string
  entry: string
  files: Array<GitHubFile>
  options: CachifiedOptions
}) {
  const key = getCompiledKey(owner, repo, branch, fileOrDirPath)
  const page = await cachified({
    cache: redisCache,
    maxAge: defaultMaxAge,
    ...options,
    key,
    checkValue: checkCompiledValue,
    getFreshValue: async () => {
      const compiledPage = await compileMdx<MdxPage["frontmatter"]>(
        fileOrDirPath,
        files,
        repo
      )
      if (compiledPage) {
        return {
          ...compiledPage,
          fileOrDirPath,
          editLink: [
            "https://github.com",
            owner,
            repo,
            "blob",
            branch,
            entry,
          ].join("/"),
        }
      } else {
        return null
      }
    },
  })
  // if there's no page, remove it from the cache
  if (!page) {
    void redisCache.del(key)
  }
  return page
}

function mdxPageMeta({
  data,
  parentsData,
}: {
  data: { page: MdxPage | null } | null
  parentsData: { root: RootLoaderData }
}) {
  // const { requestInfo } = parentsData.root;
  if (data?.page) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { keywords = [], ...extraMeta } = {}
    let title = data.page.frontmatter.title
    const isDraft = data.page.frontmatter.draft

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (isDraft) title = `(DRAFT) ${title ?? ""}`
    return {
      ...(isDraft ? { robots: "noindex" } : null),
      // ...getSocialMetas({
      //   origin: requestInfo.origin,
      //   title,
      //   description: data.page.frontmatter.description,
      //   keywords: keywords.join(", "),
      //   url: getUrl(requestInfo),
      //   image: getSocialImageWithPreTitle({
      //     origin: requestInfo.origin,
      //     url: getDisplayUrl(requestInfo),
      //     featuredImage: ""
      //     title:
      //       data.page.frontmatter.socialImageTitle ??
      //       data.page.frontmatter.title ??
      //       "Untitled",
      //     preTitle:
      //       data.page.frontmatter.socialImagePreTitle ??
      //       `Check out this article`,
      //   }),
      // }),
      ...extraMeta,
    }
  } else {
    return {
      title: "Not found",
      description: "You landed on a page we could not find. Sorry!",
    }
  }
}

/**
 * This is useful for when you don't want to send all the code for a page to the client.
 */
function mapFromMdxPageToMdxListItem(page: MdxPage): MdxListItem {
  const { code, ...mdxListItem } = page
  return mdxListItem
}

const isLinkExternal = (href?: string) => !!href?.match(/^(www|http)/i)

function GetMdxComponents(theme: Theme) {
  return {
    TrackingLink: ({ children }: any) => {
      return <div>{children}</div>
    },
    a: (props: LinkProps & { href: string }) => {
      if (isLinkExternal(props.href)) {
        return (
          <Link
            {...props}
            isExternal={true}
            rel="noreferrer"
            className="not-prose"
          />
        )
      } else {
        return (
          <RemixLink to={props.href} className="not-prose">
            <Link {...props} isExternal={false} />
          </RemixLink>
        )
      }
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
    Img: (props: React.PropsWithRef<{}>) => (
      <img {...props} className="not-prose" />
    ),
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

/**
 * This should be rendered within a useMemo
 * @param code the code to get the component from
 * @returns the component
 */
function getMdxComponent(page: MdxPage, theme: Theme | null) {
  const { code, frontmatter } = page

  const Component = getMDXComponent(code, frontmatter)
  // const headings = getHeadingsFromMdxComponent(Component);
  function MdxComponent({
    components,
    ...rest
  }: Parameters<typeof Component>["0"]) {
    return (
      <div className="prose dark:prose-invert">
        <header>
          <Heading type="h1" children={frontmatter.title} />
          <p>{frontmatter.description}</p>
        </header>
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

function useMdxComponent(page: MdxPage) {
  const [theme] = useTheme()
  return React.useMemo(() => getMdxComponent(page, theme), [page, theme])
}

export {
  getMdxPage,
  getMdxDirList,
  getMdxPagesInDirectory,
  mapFromMdxPageToMdxListItem,
  mdxPageMeta,
  useMdxComponent,
  getDirListKey,
}
