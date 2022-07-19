import { InternalLandingHeaderProps } from "~/ui/design-system/src/lib/Components/InternalLandingHeader"
import { InternalSidebarConfig } from "~/ui/design-system/src/lib/Components/InternalSidebar"

export type RepoSchema = {
  sidebar: InternalSidebarConfig
}

export type ContentSpec = {
  /**
   * The name of the github owner of the repo.
   */
  owner: string

  /**
   * The name of the repo itself that contains the content data.
   */
  repoName: string

  /**
   * The branch to pull data from.
   */
  branch: string

  /**
   * The path within the repo where the  underlying content can be found
   * (typically "/docs", but may differ in some cases)
   */
  basePath: string

  contentName: string

  displayName: string
  schema?: RepoSchema
  landingHeader?: InternalLandingHeaderProps

  /**
   * When true, the content will be considered "trusted" and will bypass
   * the sanitization process.
   */
  isTrusted: boolean
}
