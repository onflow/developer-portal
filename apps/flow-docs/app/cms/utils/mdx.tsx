import {
  getHeadingsFromMdxComponent,
  Heading,
  HeadingProps,
  InputProps,
  InternalToc,
  Link,
  StaticCheckbox,
} from "@flow-docs/ui";
import { getMDXComponent } from "mdx-bundler/client";
import React from "react";
import type { GitHubFile, MdxListItem, MdxPage, Timings } from "~/cms";
import {
  cachified,
  compileMdx,
  downloadDirList,
  downloadMdxFileOrDirectory,
  redisCache,
} from "~/cms";
import type { LoaderData as RootLoaderData } from "../../root";

function typedBoolean<T>(
  value: T
): value is Exclude<T, "" | 0 | false | null | undefined> {
  return Boolean(value);
}

type CachifiedOptions = {
  forceFresh?: boolean | string;
  request?: Request;
  timings?: Timings;
  maxAge?: number;
  expires?: Date;
};

const defaultMaxAge = 1000 * 60 * 60 * 24 * 30;

const getCompiledKey = (contentDir: string, slug: string) =>
  `${contentDir}:${slug}:compiled`;
const checkCompiledValue = (value: unknown) =>
  typeof value === "object" &&
  (value === null || ("code" in value && "frontmatter" in value));

async function getMdxPage(
  {
    repo,
    fileOrDirPath,
  }: {
    repo: string;
    fileOrDirPath: string;
  },
  options: CachifiedOptions
): Promise<MdxPage | null> {
  const key = getCompiledKey(repo, fileOrDirPath);
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
        repo,
        fileOrDirPath,
        options
      );
      const compiledPage = await compileMdxCached({
        repo,
        fileOrDirPath,
        ...pageFiles,
        options,
      }).catch((err) => {
        console.error(`Failed to get a fresh value for mdx:`, {
          repo,
          fileOrDirPath,
        });
        return Promise.reject(err);
      });

      return compiledPage;
    },
  });
  if (!page) {
    // if there's no page, let's remove it from the cache
    void redisCache.del(key);
  }
  return page;
}

async function getMdxPagesInDirectory(
  repo: string,
  fileOrDirPath: string,
  options: CachifiedOptions
) {
  const dirList = await getMdxDirList(repo, fileOrDirPath, options);

  // our octokit throttle plugin will make sure we don't hit the rate limit
  const pageDatas = await Promise.all(
    dirList.map(async ({ slug }) => {
      return {
        ...(await downloadMdxFilesCached(repo, fileOrDirPath, options)),
        slug,
      };
    })
  );

  const pages = await Promise.all(
    pageDatas.map((pageData) =>
      compileMdxCached({ repo, fileOrDirPath, ...pageData, options })
    )
  );
  return pages.filter(typedBoolean);
}

const getDirListKey = (contentDir: string) => `${contentDir}:dir-list`;

async function getMdxDirList(
  repo: string,
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
      const fullContentDirPath = `docs/${fileOrDirPath}`;
      const dirList = (await downloadDirList(repo, fullContentDirPath))
        .map(({ name, path }) => ({
          name,
          slug: path
            .replace(`${fullContentDirPath}/`, "")
            .replace(/\.mdx$/, ""),
        }))
        .filter(({ name }) => name !== "README.md");
      return dirList;
    },
  });
}

const getDownloadKey = (contentDir: string, slug: string) =>
  `${contentDir}:${slug}:downloaded`;

async function downloadMdxFilesCached(
  repo: string,
  fileOrDirPath: string,
  options: CachifiedOptions
) {
  const key = getDownloadKey(repo, fileOrDirPath);
  const downloaded = await cachified({
    cache: redisCache,
    maxAge: defaultMaxAge,
    ...options,
    key,
    checkValue: (value: unknown) => {
      if (typeof value !== "object") {
        return `value is not an object`;
      }
      if (value === null) {
        return `value is null`;
      }

      const download = value as Record<string, unknown>;
      if (!Array.isArray(download.files)) {
        return `value.files is not an array`;
      }
      if (typeof download.entry !== "string") {
        return `value.entry is not a string`;
      }

      return true;
    },
    getFreshValue: async () => downloadMdxFileOrDirectory(repo, fileOrDirPath),
  });
  // if there aren't any files, remove it from the cache
  if (!downloaded.files.length) {
    void redisCache.del(key);
  }
  return downloaded;
}

async function compileMdxCached({
  repo,
  fileOrDirPath,
  entry,
  files,
  options,
}: {
  repo: string;
  fileOrDirPath: string;
  entry: string;
  files: Array<GitHubFile>;
  options: CachifiedOptions;
}) {
  const key = getCompiledKey(repo, fileOrDirPath);
  const page = await cachified({
    cache: redisCache,
    maxAge: defaultMaxAge,
    ...options,
    key,
    checkValue: checkCompiledValue,
    getFreshValue: async () => {
      const compiledPage = await compileMdx<MdxPage["frontmatter"]>(
        `docs/${fileOrDirPath}`,
        files
      );
      if (compiledPage) {
        return {
          ...compiledPage,
          fileOrDirPath,
        };
      } else {
        return null;
      }
    },
  });
  // if there's no page, remove it from the cache
  if (!page) {
    void redisCache.del(key);
  }
  return page;
}

function mdxPageMeta({
  data,
  parentsData,
}: {
  data: { page: MdxPage | null } | null;
  parentsData: { root: RootLoaderData };
}) {
  // const { requestInfo } = parentsData.root;
  if (data?.page) {
    const { keywords = [], ...extraMeta } = {};
    let title = data.page.frontmatter.title;
    const isDraft = data.page.frontmatter.draft;
    if (isDraft) title = `(DRAFT) ${title ?? ""}`;
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
    };
  } else {
    return {
      title: "Not found",
      description: "You landed on a page we could not find. Sorry!",
    };
  }
}

/**
 * This is useful for when you don't want to send all the code for a page to the client.
 */
function mapFromMdxPageToMdxListItem(page: MdxPage): MdxListItem {
  const { code, ...mdxListItem } = page;
  return mdxListItem;
}

const mdxComponents = {
  a: Link,
  input: (props: InputProps) =>
    props.type === "checkbox" ? (
      <StaticCheckbox {...props} />
    ) : (
      <input {...props} />
    ),
  h1: (props: HeadingProps) => <Heading type="h1" {...props} />,
  h2: (props: HeadingProps) => <Heading type="h2" {...props} />,
  h3: (props: HeadingProps) => <Heading type="h3" {...props} />,
  h4: (props: HeadingProps) => <Heading type="h4" {...props} />,
  h5: (props: HeadingProps) => <Heading type="h5" {...props} />,
  h6: (props: HeadingProps) => <Heading type="h6" {...props} />,
};

/**
 * This should be rendered within a useMemo
 * @param code the code to get the component from
 * @returns the component
 */
function getMdxComponent({ code, frontmatter }: MdxPage) {
  const Component = getMDXComponent(code);
  const headings = getHeadingsFromMdxComponent(Component);

  function MdxComponent({
    components,
    ...rest
  }: Parameters<typeof Component>["0"]) {
    return (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Internal table of contents
      <div className="flex flex-row">
        <div className="mdx-content ml-16 mr-8 w-auto">
          <Component components={mdxComponents} {...rest} />
        </div>
        {frontmatter.showToc && <InternalToc headings={headings} />}
<<<<<<< HEAD
=======
      <div className="mdx-content">
        <Component components={mdxComponents} {...rest} />
>>>>>>> Add mdx content styling, fix remark plugins
=======
>>>>>>> Internal table of contents
      </div>
    );
  }
  return MdxComponent;
}

function useMdxComponent(page: MdxPage) {
  return React.useMemo(() => getMdxComponent(page), [page]);
}

export {
  getMdxPage,
  getMdxDirList,
  getMdxPagesInDirectory,
  mapFromMdxPageToMdxListItem,
  mdxPageMeta,
  useMdxComponent,
  getDirListKey,
};
