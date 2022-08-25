import { Repo } from "../cms/types"
import { InternalLandingHeaderProps } from "../ui/design-system/src/lib/Components/InternalLandingHeader"
import { SidebarItemList } from "../ui/design-system/src/lib/Components/InternalSidebar"

export const JSON_MANIFEST_FILENAME = "flow-docs.json"

export function manifestCacheKey(source: DocCollectionSource): string {
  return [`manifest`, source.owner, source.name, source.branch].join(":")
}

/**
 * Represents the source location for a collection of documents.
 */
export interface DocCollectionSource extends Repo {
  /**
   * The root path of the docs for the current collection (typically "/docs")
   */
  rootPath: string
}

// intentionally avoiding ts Record type here, because the ts to json-schema
// generator doesn't work well with Record<string, ...> types
// https://github.com/YousefED/typescript-json-schema/issues/337
export type Headers = { [key: string]: InternalLandingHeaderProps }
export type Redirects = { [key: string]: string }
export type Sidebars = { [key: string]: SidebarItemList }

/**
 * A manifest descripting the doc collection and it's properties.
 */
export type DocCollectionManifest = {
  /**
   * The name of this collection to display to the end-user (i.e. for
   * breadcrumbs, headings, etc)
   */
  displayName: string

  /**
   * A mapping of paths to sidebars that should be rendered when a page is
   * within the given path. Paths should be relative to the doc collection root.
   * TODO: clarify how the sidebar is determined from a requested content path.
   */
  sidebars?: Sidebars

  /**
   * A mapping of paths and the headers they should render. Paths should
   * be relative to the doc collection root.
   */
  headers?: Headers

  /**
   * A mapping of paths that should be redirected. These should be relative
   * to the doc collection root.
   */
  redirects?: Redirects
}

export interface DocCollection {
  source: DocCollectionSource
  manifest: DocCollectionManifest
}
