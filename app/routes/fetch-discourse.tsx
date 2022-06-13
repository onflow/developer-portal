import {
  Topic,
  useBreakingChangesPosts,
  useMainnetSporkPosts,
} from "~/cms/utils/hooks-discourse"
import { StatuspageApiResponse } from "~/libs/design-system/src/lib/interfaces"

export default function NetworkStatus() {
  const topics: Topic[] = useBreakingChangesPosts()
  return (
    <div>
      <h1>Discourse Breaking Changes</h1>
      Number of Topics: {topics.length}
      <div className="w-full">
        {topics.map((t) => (
          <li id="user-content-fn-1" key={t.id}>
            Breaking Change: {t.title} - {t.slug} - {t.__formatted_date} -{" "}
            {t.featured_link}
          </li>
        ))}
      </div>
    </div>
  )
}
