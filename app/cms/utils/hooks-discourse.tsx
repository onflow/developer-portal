import { useState, useEffect } from "react"
import useSWR from "swr"
import moment from "moment"
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
  // Formatted date is a custom field added by our implementation, not taken from the API response
  __formatted_date?: string
}

export interface Poster {
  extras: string
  description: string
  user_id: number
  primary_group_id: string
}

const fetchDiscourseChanges = (url: string) => {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json())
}

export function useBreakingChangesPosts(): Topic[] {
  const [posts, setPosts] = useState<Topic[]>([])

  // List topics API: https://docs.discourse.org/#tag/Categories/operation/listCategoryTopics
  useSWR(`${DISCOURSE_API_URL}`, fetchDiscourseChanges, {
    refreshInterval: 100000,
    onSuccess(data: DiscourseTopicsResponse) {
      const {
        topic_list: { topics },
      } = data

      const sorted = topics
        // Remove the "About this category" post
        .filter((post: Topic) => post.id !== 762)
        .map((post: Topic) => {
          const date = moment(new Date(post.created_at)).fromNow()
          post.__formatted_date = date
          return post
        })
        .sort((a, b) => {
          return new Date(a.created_at).getTime() >
            new Date(b.created_at).getTime()
            ? -1
            : 1
        })

      setPosts(sorted)
    },
  })

  return posts || []
}

export function useMainnetSporkPosts(): Topic[] {
  const [posts, setPosts] = useState<Topic[]>([])

  useSWR(DISCOURSE_MAINNET_SPORK_URL, fetchDiscourseChanges, {
    refreshInterval: 100000,
    onSuccess(data: DiscourseTopicsResponse) {
      const {
        topic_list: { topics },
      } = data

      const sorted = topics
        // Removes the "About this category" post
        .filter((post: Topic) => post.id !== 2543)
        .map((post: Topic) => {
          const date = moment(new Date(post.created_at)).fromNow()
          post.__formatted_date = date
          return post
        })
        // Couldn't find any sorting options on the API side
        .sort((a, b) => {
          return new Date(a.created_at).getTime() >
            new Date(b.created_at).getTime()
            ? -1
            : 1
        })

      setPosts(sorted)
    },
  })
  console.log(posts)
  return posts || []
}
