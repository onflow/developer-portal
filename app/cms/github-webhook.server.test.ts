import {
  getDocumentPathsForPR,
  pushEventCacheKeysToInvalidate,
} from "./github-webhook.server"

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

test("it clears manifest cache keys when flow-docs.json is modified", () => {
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

test("it returns document cache keys when document are modified", () => {
  const event: any = {
    ...exampleEvent,
    commits: [
      {
        added: [],
        removed: [],
        modified: ["docs/faq.md", "docs/foobar.mdx", "src/something.ts"],
      },
    ],
  }

  const result = pushEventCacheKeysToInvalidate(event)

  const docCollectionKey = [
    `onflow`,
    `mock-developer-doc`,
    `json-manifest-valid`,
    `docs/`,
  ].join(":")

  expect(result.cacheKeysToInvalidate).toEqual(
    new Set([
      `github-dir-list:${docCollectionKey}`,
      `${docCollectionKey}:faq:compiled`,
      `${docCollectionKey}:faq:downloaded`,
      `${docCollectionKey}:foobar:compiled`,
      `${docCollectionKey}:foobar:downloaded`,
    ])
  )
})

test("it returns special paths for index documents", () => {
  const event: any = {
    ...exampleEvent,
    commits: [
      {
        added: [],
        removed: [],
        modified: ["docs/index.md", "docs/foo/index.mdx"],
      },
    ],
  }

  const result = pushEventCacheKeysToInvalidate(event)
  const docCollectionKey = [
    `onflow`,
    `mock-developer-doc`,
    `json-manifest-valid`,
    `docs/`,
  ].join(":")

  expect(result.cacheKeysToInvalidate).toEqual(
    new Set([
      `github-dir-list:${docCollectionKey}`,
      `${docCollectionKey}:index:compiled`,
      `${docCollectionKey}:index:downloaded`,
      `${docCollectionKey}::compiled`,
      `${docCollectionKey}::downloaded`,
      `${docCollectionKey}:foo/index:compiled`,
      `${docCollectionKey}:foo/index:downloaded`,
      `${docCollectionKey}:foo:compiled`,
      `${docCollectionKey}:foo:downloaded`,
    ])
  )
})

test("it returns keys for the onflow repoo", () => {
  const event: any = {
    ref: "refs/heads/master",
    repository: {
      name: "flow",
      owner: { login: "onflow" },
    },
    commits: [
      {
        added: [],
        removed: [],
        modified: [
          "docs/content/dapp-development/index.md",
          "docs/content/dapp-development/in-dapp-payments.mdx",
        ],
      },
    ],
  }

  const result = pushEventCacheKeysToInvalidate(event)
  const docCollectionKey = `onflow:flow:master:docs/content/dapp-development/`

  expect(result.docCollectionStatus).toBe("match")
  expect(result.cacheKeysToInvalidate).toEqual(
    new Set([
      `${docCollectionKey}::compiled`,
      `${docCollectionKey}::downloaded`,
      `${docCollectionKey}:index:compiled`,
      `${docCollectionKey}:index:downloaded`,
      `${docCollectionKey}:in-dapp-payments:compiled`,
      `${docCollectionKey}:in-dapp-payments:downloaded`,
      `github-dir-list:${docCollectionKey}`,
    ])
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

test("returns paths for documents modified by the PR", () => {
  const docs = new Set()

  const changes = [
    "docs/content/dapp-development/index.md",
    "docs/content/dapp-development/in-dapp-payments.mdx",
    "src/code/file.js",
  ]

  // expect changes to include only files in docs folder.
  changes.slice(0, -1).forEach((c) => docs.add(c))

  const event: any = {
    ...exampleEvent,
    commits: [
      {
        added: [],
        removed: [],
        modified: changes,
      },
    ],
  }

  const result = getDocumentPathsForPR(event)
  expect(result.updatedDocuments).toStrictEqual(docs)
})

test("returns empty set when no docs changes are found", () => {
  const docs = new Set()

  const changes = ["src/code/file.js", "src/code/another-file.js"]

  const event: any = {
    ...exampleEvent,
    commits: [
      {
        added: [],
        removed: [],
        modified: changes,
      },
    ],
  }

  const result = getDocumentPathsForPR(event)
  expect(result.updatedDocuments).toStrictEqual(docs)
})
