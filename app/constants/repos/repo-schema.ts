// run `yarn jsonschema` after making changes to the file
// which updates repo-schema.json

import { InternalSidebarConfig } from "~/ui/design-system/src/lib/Components/InternalSidebar"

export type RepoSchema = {
  sidebar: InternalSidebarConfig
}
