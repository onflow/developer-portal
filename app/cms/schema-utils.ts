// run `yarn jsonschema` after making changes to the file
// which updates repo-schema.json

import { capitalCase } from "change-case"
import {
  InternalSidebarConfig,
  InternalSidebarSection,
  InternalSidebarSectionItem,
} from "~/ui/design-system/src/lib/Components/InternalSidebar"

import { RepoSchema, ContentSpec } from "~/cms/schema"

export const formatTitle = (href: string) =>
  href
    .split("/")
    .at(-1)
    ?.split("-")
    .map((word) => capitalCase(word))
    .join(" ")

export const populateRepoSchema = (repoSchema: RepoSchema) => {
  const sections: InternalSidebarSection[] = repoSchema.sidebar.sections.map(
    ({ title, items }: InternalSidebarSection) => {
      const populatedItems: InternalSidebarSectionItem[] = items.map(
        ({ href, label }: InternalSidebarSectionItem) => {
          const populatedLabel = formatTitle(href)
          return { href, label: populatedLabel ?? label }
        }
      )
      return { title, items: populatedItems } as InternalSidebarSection
    }
  )
  const sideBar: InternalSidebarConfig = { sections }
  return { sidebar: sideBar } as RepoSchema
}

export const getContentSpecForRepo = (
  repoName: string
): ContentSpec | void => {}
