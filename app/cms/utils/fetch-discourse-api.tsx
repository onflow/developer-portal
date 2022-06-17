import {
  ForumCellProps,
  User,
} from "~/ui/design-system/src/lib/Components/ForumCell"
import {
  DISCOURSE_API_URL,
  DISCOURSE_BREAKING_CHANGES_URL,
  DISCOURSE_LATEST_TOPICS_URL,
  DISCOURSE_MAINNET_SPORK_URL,
} from "./constants"

export interface TopicsUser {
  id: number
  username: string
  name: string
  avatar_template: string
}

export interface DiscourseTopicsResponse {
  users: TopicsUser[]
  primary_groups: any[]
  topic_list: TopicList
}

export interface TopicList {
  can_create_topic: boolean
  per_page: number
  top_tags: any[]
  topics: Topic[]
}

export interface Topic {
  id: number
  title: string
  fancy_title: string
  slug: string
  posts_count: number
  reply_count: number
  highest_post_number: number
  image_url: string
  created_at: string
  last_posted_at: string
  bumped: boolean
  bumped_at: string
  archetype: string
  unseen: boolean
  pinned: boolean
  unpinned: string
  excerpt: string
  visible: boolean
  closed: boolean
  archived: boolean
  bookmarked: string
  liked: string
  views: number
  like_count: number
  has_summary: boolean
  last_poster_username: string
  category_id: number
  pinned_globally: boolean
  featured_link: string
  posters: any
}
const createForumLink = (
  topicSlug: string,
  topicId: number,
  highestPostNumber: number
) =>
  [
    DISCOURSE_API_URL,
    "t",
    topicSlug,
    topicId.toString(),
    highestPostNumber.toString(),
  ].join("/")

const convertToUser = (username: string, displayUrl: string) =>
  ({
    profileImage:
      displayUrl ??
      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    name: username,
  } as User)

const convertTopicToForumCellProps = (topic: Topic) =>
  ({
    numComments: topic.highest_post_number - 1,
    heading: topic.fancy_title,
    subheading: "", // TODO: what is subheading? category?
    participants: [convertToUser(topic.last_poster_username, topic.image_url)],
    lastUpdatedDate: topic.last_posted_at, // "YYYY-MM-DDTHH:MM:SS.XXXZ"
    forumLink: createForumLink(topic.slug, topic.id, topic.highest_post_number),
  } as ForumCellProps)

const formatLatestFiveTopics = (topics: Topic[]) =>
  topics.slice(0, 5).map((topic) => convertTopicToForumCellProps(topic))

const fetchDiscourse = (url: string) => {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json())
}

export async function fetchLatestTopics() {
  const data: DiscourseTopicsResponse = await fetchDiscourse(
    DISCOURSE_LATEST_TOPICS_URL
    // https://docs.discourse.org/#tag/Topics/operation/listLatestTopics
  )

  const {
    topic_list: { topics },
  } = data

  return formatLatestFiveTopics(topics)
}

// Category: Breaking Changes
export async function fetchBreakingChangesTopics() {
  const data: DiscourseTopicsResponse = await fetchDiscourse(
    DISCOURSE_BREAKING_CHANGES_URL
    // https://docs.discourse.org/#tag/Categories/operation/listCategoryTopics
  )

  const {
    topic_list: { topics },
  } = data

  return topics
}

// Category: Mainnet Spork
export async function fetchMainnetSporkTopics() {
  const data: DiscourseTopicsResponse = await fetchDiscourse(
    DISCOURSE_MAINNET_SPORK_URL
    // https://docs.discourse.org/#tag/Categories/operation/listCategoryTopics
  )

  const {
    topic_list: { topics },
  } = data

  return topics
}
