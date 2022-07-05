import { InternalSidebarConfig } from "."

/**
 * Returns the `item` of the sidebar configuration item that matches the given path.
 *
 * @param sidebarConfig The configuration object that describes the page hierarchy.
 * @param path The path of the item to find (relative to the repo, excluding the repo name)
 */
export const findSidebarSectionItem = (
  sidebarConfig: InternalSidebarConfig | undefined,
  path: string
) => {
  if (!sidebarConfig) {
    return undefined
  }

  for (const section of sidebarConfig.sections) {
    for (const item of section.items) {
      if (item.href === path) {
        return item
      }
    }
  }

  return undefined
}
