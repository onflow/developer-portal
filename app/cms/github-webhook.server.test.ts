import { pushEventCacheKeysToInvalidate } from "./github-webhook.server"

let exampleEvent: any = {
  ref: "refs/heads/json-manifest-valid",
  repository: {
    name: "mock-developer-doc",
    owner: {
      login: "onflow",
    },
  },
  commits: [
    {
      added: [],
      removed: [],
      modified: [],
    },
  ],
}

test("it clears the expected cache keys when files are modified", () => {
  const event: any = {
    ...exampleEvent,
    commits: [
      {
        added: [],
        removed: [],
        modified: ["docs/flow-docs.json"],
      },
    ],
  }

  const result = pushEventCacheKeysToInvalidate(event)

  expect(result.cacheKeysToInvalidate).toEqual(
    new Set([`manifest:onflow:mock-developer-doc:json-manifest-valid`])
  )
})

test("it clears the expected cache keys when files are removed", () => {
  const event: any = {
    ...exampleEvent,
    commits: [
      {
        added: [],
        removed: ["docs/flow-docs.json"],
        modified: [],
      },
    ],
  }

  const result = pushEventCacheKeysToInvalidate(event)

  expect(result.cacheKeysToInvalidate).toEqual(
    new Set([`manifest:onflow:mock-developer-doc:json-manifest-valid`])
  )
})

test("doesn't clear keys when files are not matched", () => {
  const event: any = {
    ...exampleEvent,
    commits: [
      {
        added: [],
        removed: [],
        modified: ["src/some-other-file.txt"],
      },
    ],
  }

  const result = pushEventCacheKeysToInvalidate(event)

  expect(result.cacheKeysToInvalidate).toEqual(new Set([]))
})

test("doesn't return keys when repo doesn't match", () => {
  const event: any = {
    ...exampleEvent,
    repository: {
      name: "example-unknown-repo",
      owner: {
        login: "onflow",
      },
    },
    commits: [
      {
        added: [],
        removed: [],
        modified: ["docs/flow-docs.json"],
      },
    ],
  }

  const result = pushEventCacheKeysToInvalidate(event)
  expect(result.docCollectionStatus).toBe("not-found")
})

test("doesn't return keys when branch doesn't match", () => {
  const event: any = {
    ...exampleEvent,
    ref: "refs/heads/unknown-branch",
    commits: [
      {
        added: [],
        removed: [],
        modified: ["docs/flow-docs.json"],
      },
    ],
  }

  const result = pushEventCacheKeysToInvalidate(event)
  expect(result.docCollectionStatus).toBe("not-found")
})
