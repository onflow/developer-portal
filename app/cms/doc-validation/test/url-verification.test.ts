import { afterAll, afterEach, beforeAll, expect } from "vitest"
import { UrlItem } from "~/cms/rehype-plugins/extractUrls"
import { validateUrl, ValidateUrlContext } from "../validate-url"

// Start server before all tests
beforeAll(() => {
  // Clean output file before tests
  // fs.truncateSync("helloworld.txt", 0)

  // Sets server to listen mode. 'error' does not allow any unmocked traffic pass through. 'bypass' does the opposite.
  // server.listen({ onUnhandledRequest: "bypass" })

  // Environment variables for testing. GITHUB_APP_ID is a set value. BOT_GITHUB_TOKEN is your github personal access token
  process.env.GITHUB_APP_ID = "230821"
  process.env.BOT_GITHUB_TOKEN = ""
})

afterAll(() => {})

// Reset handlers after each test `important for test isolation`
afterEach(() => {})

const context: ValidateUrlContext = {
  rootRelativePath: ".",
  validRelativeFileUrls: [""],
  collection: {
    source: {
      rootPath: "",
      owner: "",
      name: "",
      branch: "",
    },
    manifest: {
      displayName: "",
    },
  },
}
type TestUrl = {
  urlItem: UrlItem
  result: {
    type: string
    result: string
  }
}

const testUrls: TestUrl[] = [
  {
    urlItem: {
      attributeName: "test",
      tagName: "test",
      href: "/flow",
      position: undefined,
    },
    result: {
      type: "external",
      result: "ok",
    },
  },
  {
    urlItem: {
      attributeName: "test",
      tagName: "test",
      href: "/bad",
      position: undefined,
    },
    result: {
      type: "external",
      result: "invalid",
    },
  },
  {
    urlItem: {
      attributeName: "test",
      tagName: "test",
      href: "../outside.mdx",
      position: undefined,
    },
    result: {
      type: "internal",
      result: "ignored",
    },
  },
]

it("Test urls", async () => {
  // TODO: spin up mock http server to test validating urls.
  testUrls.forEach(async (item) => {
    const urlResult = await validateUrl(item.urlItem as UrlItem, context)
    expect(item.result.type).equal(urlResult.type)
    expect(item.result.result).equal(urlResult.result)
  })
}, 15000)
