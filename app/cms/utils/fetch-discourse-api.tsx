import { DISCOURSE_API_URL, DISCOURSE_MAINNET_SPORK_URL } from "./constants"

export interface DiscourseTopicsResponse {
  users: User[]
  primary_groups: any[]
  topic_list: TopicList
}

export interface User {
  id: number
  username: string
  name: string
  avatar_template: string
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
  posters: Poster[]
}

export interface Poster {
  extras: string
  description: string
  user_id: number
  primary_group_id: string
}

const fetchDiscourseChanges = (url: string) => {
  // List topics API: https://docs.discourse.org/#tag/Categories/operation/listCategoryTopics
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json())
}

export async function fetchBreakingChangesPosts() {
  const data: DiscourseTopicsResponse = await fetchDiscourseChanges(
    DISCOURSE_API_URL
  )

  const {
    topic_list: { topics },
  } = data

  return topics
}

export async function fetchMainnetSporkPosts() {
  const data: DiscourseTopicsResponse = await fetchDiscourseChanges(
    DISCOURSE_MAINNET_SPORK_URL
  )

  const {
    topic_list: { topics },
  } = data

  return topics
}
