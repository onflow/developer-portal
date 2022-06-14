// run `yarn jsonschema` after making changes to the file
// which updates repo-schema.json

type SidebarItem =
  | {
      type: "category"
      label: string
      items: Array<SidebarItem>
    }
  | {
      type: "link"
      label: string
      href: string
    }
  | {
      type: "doc"
      label: string
      /**
       * e.g. docs/getting-started
       */
      id: string
    }

export type RepoSchema = {
  sidebar: Array<SidebarItem>
}
