import cadence from "./cadence.json"
import repos from "../repos.json"
import { RepoSchema } from "./repo-schema"

type Repo = typeof repos

const values: Partial<Record<Repo[number]["repo"], RepoSchema>> = {
  cadence: cadence as RepoSchema,
}

export default values
