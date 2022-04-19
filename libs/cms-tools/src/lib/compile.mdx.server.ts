// TODO: Replace this with Prism post MVP
import { remarkCodeBlocksShiki } from '@kentcdodds/md-temp';

import remarkEmbedder from '@remark-embedder/core';
import oembedTransformer from '@remark-embedder/transformer-oembed';

import { bundleMDX } from 'mdx-bundler';

import type * as U from 'unified';

import type * as H from 'hast';

import calculateReadingTime from 'reading-time';

import type TPQueue from 'p-queue';

import type { GitHubFile } from '../../types';

function handleEmbedderError({ url }: { url: string }) {
  return `<p>Error embedding <a href="${url}">${url}</a>.`;
}

function removePreContainerDivs() {
  return async function preContainerDivsTransformer(tree: H.Root) {
    const { visit } = await import('unist-util-visit');
    visit(
      tree,
      { type: 'element', tagName: 'pre' },
      function visitor(node, index, parent) {
        if (parent?.type !== 'element') return;
        if (parent.tagName !== 'div') return;
        if (parent.children.length !== 1 && index === 0) return;
        Object.assign(parent, node);
      }
    );
  };
}

const remarkPlugins: U.PluggableList = [
  remarkCodeBlocksShiki,
  [
    // @ts-expect-error 🤷‍♂️
    remarkEmbedder,
    {
      handleError: handleEmbedderError,
      transformers: [oembedTransformer],
    },
  ],
];

const rehypePlugins: U.PluggableList = [removePreContainerDivs];

async function compileMdx<FrontmatterType extends Record<string, unknown>>(
  slug: string,
  githubFiles: Array<GitHubFile>
) {
  const { default: remarkAutolinkHeadings } = await import(
    'remark-autolink-headings'
  );
  const { default: remarkSlug } = await import('remark-slug');
  const { default: gfm } = await import('remark-gfm');

  const indexRegex = new RegExp(`${slug}\\/index.mdx?$`);
  const indexFile = githubFiles.find(({ path }) => indexRegex.test(path));
  if (!indexFile) return null;

  const rootDir = indexFile.path.replace(/index.mdx?$/, '');
  const relativeFiles: Array<GitHubFile> = githubFiles.map(
    ({ path, content }) => ({
      path: path.replace(rootDir, './'),
      content,
    })
  );
  const files = arrayToObj(relativeFiles, {
    keyName: 'path',
    valueName: 'content',
  });

  try {
    const { frontmatter, code } = await bundleMDX({
      source: indexFile.content,
      files,
      // @ts-expect-error
      xdmOptions(options) {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          remarkSlug,
          [remarkAutolinkHeadings, { behavior: 'wrap' }],
          gfm,
          ...remarkPlugins,
        ];
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          ...rehypePlugins,
        ];
        return options;
      },
    });
    const readTime = calculateReadingTime(indexFile.content);

    return {
      code,
      readTime,
      frontmatter: frontmatter as FrontmatterType,
    };
  } catch (error: unknown) {
    console.error(`Compilation error for slug: `, slug);
    throw error;
  }
}

function arrayToObj<ItemType extends Record<string, unknown>>(
  array: Array<ItemType>,
  { keyName, valueName }: { keyName: keyof ItemType; valueName: keyof ItemType }
) {
  const obj: Record<string, ItemType[keyof ItemType]> = {};
  for (const item of array) {
    const key = item[keyName];
    if (typeof key !== 'string') {
      throw new Error(`${keyName} of item must be a string`);
    }
    const value = item[valueName];
    obj[key] = value;
  }
  return obj;
}

let _queue: TPQueue | null = null;
async function getQueue() {
  const { default: PQueue } = await import('p-queue');
  if (_queue) return _queue;

  _queue = new PQueue({ concurrency: 1 });
  return _queue;
}

// We have to use a queue because we can't run more than one of these at a time
// or we'll hit an out of memory error because esbuild uses a lot of memory...
async function queuedCompileMdx<
  FrontmatterType extends Record<string, unknown>
>(...args: Parameters<typeof compileMdx>) {
  const queue = await getQueue();
  const result = await queue.add(() => compileMdx<FrontmatterType>(...args));
  return result;
}

export { queuedCompileMdx as compileMdx };
