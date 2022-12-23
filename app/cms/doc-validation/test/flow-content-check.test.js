import { afterAll, afterEach, beforeAll, it } from "vitest"
import { setupServer } from "msw/node"
import { rest } from "msw"
import * as fs from "fs"

import GetPrResponse from "./fixtures/get_PR_response.json"
import GetTreeResponse from "./fixtures/get_tree_response.json"
import GetFileResponse from "./fixtures/get_file_response.json"
import RepoResponse from "./fixtures/repo.json"
import { validateCollection } from "../validate-collection.server"

export const restHandlers = [
  rest.get("https://api.test.com/user/:login", (req, res, ctx) => {
    return res(ctx.json({ login: req.params.login }))
  }),

  rest.post(
    "https://api.github.com/app/installations/2/access_tokens",
    (req, res, ctx) => {
      return res(
        ctx.json({
          token: "test",
          permissions: {
            checks: "write",
          },
        })
      )
    }
  ),

  rest.post(
    "https://api.github.com/repos/onflow/fcl-js/check-runs",
    async (req, res, ctx) => {
      // console.log("post request:", await req.json())

      return res()
    }
  ),

  rest.patch(
    "https://api.github.com/repos/onflow/fcl-js/check-runs/9925474144",
    async (req, res, ctx) => {
      // let reqBody = await req.json()
      // reqBody = JSON.stringify(reqBody, null, 2)

      // fs.appendFileSync("helloworld.txt", reqBody)

      return res()
    }
  ),

  rest.get(
    "https://api.github.com/repos/onflow/fcl-js/pulls/1505/files",
    (req, res, ctx) => {
      return res(ctx.json(GetPrResponse))
    }
  ),

  rest.get(
    "https://api.github.com/repos/onflow/fcl-js/git/trees/0d41854e6313b56bca34abe9e081df17a484ef5c",
    (req, res, ctx) => {
      return res(ctx.json(GetTreeResponse))
    }
  ),

  rest.get(
    "https://api.github.com/repos/onflow/flow/contents/docs%2Fcontent%2Fnodes%2Faccess-api.mdx",
    (req, res, ctx) => {
      return res(ctx.json(GetFileResponse))
    }
  ),
]

const server = setupServer(...restHandlers)

const env = process.env

// Start server before all tests
beforeAll(() => {
  // fs.truncateSync("helloworld.txt", 0)
  server.listen({ onUnhandledRequest: "bypass" })
  process.env.GITHUB_APP_ID = "230821"
  process.env.BOT_GITHUB_TOKEN = "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"
})

//  Close server after all tests
afterAll(() => {
  process.env = env
  server.close()
})

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())

// Remember to make sure mocked payloads are correct
it("Test validate collection", async () => {
  // let result = await validateCollection({
  //   collection: {
  //     source: {
  //       owner: "onflow",
  //       name: "flow",
  //       branch: "master",
  //       rootPath: "docs/content/nodes/",
  //     },
  //   },
  //   files: [
  //     "docs/content/nodes/access-api-rate-limits.mdx",
  //     "docs/content/nodes/access-api.mdx",
  //     "docs/content/nodes/archive-access-api.mdx",
  //     "docs/content/nodes/archive-api-rate-limits.mdx",
  //     "docs/content/nodes/index.mdx"
  //   ],
  //   filesRemoved: [],
  //   filesToValidate: ["docs/content/nodes/access-api.mdx"],
  //   repo: RepoResponse,
  //   sha: "a1d2a939c4c17137ea43ba2cfcac8723a147d544",
  // })
  // result[0].urls.forEach(element => {
  //   if (element.result == 'invalid') {
  //     console.log(element);
  //   }
  // });
}, 15000)
