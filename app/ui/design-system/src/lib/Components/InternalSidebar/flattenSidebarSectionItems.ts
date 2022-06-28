import { InternalSidebarConfig } from "."

/**
 * Returns an ordered array of all `InternalSidebarSectionItem`s from
 * all sections of the given sidebarConfig.
 */
export const flattenSidebarSectionItems = (
  sidebarConfig: InternalSidebarConfig
) => {
  const items = []

  for (const section of sidebarConfig.sections) {
    for (const item of section.items) {
      items.push(item)
    }
  }

  return items
}
