import { afterAll, afterEach, beforeAll } from "vitest"
import { setupServer } from "msw/node"
import { rest } from "msw"
import {
  contentCheckOnCheckSuite,
  contentCheckOnCheckRun,
} from "../webhook-content-check.server"
import { Octokit } from "../../github/octokit.server"
import { CheckRunEvent, CheckSuiteEvent } from "@octokit/webhooks-types"

import CheckSuiteRequestedPayload from "./fixtures/check_suite_fcl.requested.json"
import CheckRunCreatedPayload from "./fixtures/check_run_fcl.created.json"

import GetPrResponse from "./fixtures/get_PR_response.json"
import GetTreeResponse from "./fixtures/get_tree_response.json"

// Name of the repo to be appended on URL
const repoName = "fcl-js"

// Id of check run to test. Can be found on the check run created payload.
const checkRunId = "9925474144"

// Id of the PR to validate. Can be found on the check run created payload.
const prId = "1505"

// Id of the git tree of the PR. Can be found on the check run created payload under pull_requests.head.sha
const gitTreeId = "0d41854e6313b56bca34abe9e081df17a484ef5c"

// URl-encoded file name to be downloaded
//const fileName = "docs%2Findex.md"

// path to an output file to print patch requests. These are what Github receive from the App to display on the PR
//const outputFile = "./patch_requests.txt"

export const restHandlers = [
  // Github endpoint to create a check run from a check suite requested call from Github
  rest.post(
    `https://api.github.com/repos/onflow/${repoName}/check-runs`,
    async (req, res, ctx) => {
      return res()
    }
  ),

  // Github endpoint to update the check run on the PR
  rest.patch(
    `https://api.github.com/repos/onflow/${repoName}/check-runs/${checkRunId}`,
    async (req, res, ctx) => {
      // Pretty-print patch requests to an output file
      // let reqBody = await req.json()
      // reqBody = JSON.stringify(reqBody, null, 2)
      // fs.appendFileSync("helloworld.txt", reqBody)

      return res()
    }
  ),

  // Github endpoint to get changed files from a PR
  rest.get(
    `https://api.github.com/repos/onflow/${repoName}/pulls/${prId}/files`,
    (req, res, ctx) => {
      return res(ctx.json(GetPrResponse))
    }
  ),

  // Github endpoint to get the expanded git tree
  rest.get(
    `https://api.github.com/repos/onflow/${repoName}/git/trees/${gitTreeId}`,
    (req, res, ctx) => {
      return res(ctx.json(GetTreeResponse))
    }
  ),

  // Github endpoint to download content of a file
  // rest.get(
  //   `https://api.github.com/repos/onflow/${repoName}/contents/${fileName}`,
  //   (req, res, ctx) => {
  //     return res(ctx.json(GetFileResponse))
  //   }
  // ),
]

// Setup msw server to mock requests
const server = setupServer(...restHandlers)

// Saves env to override them during testinig
const env = process.env

// Start server before all tests
beforeAll(() => {
  // Clean output file before tests
  // fs.truncateSync("helloworld.txt", 0)

  // Sets server to listen mode. 'error' does not allow any unmocked traffic pass through. 'bypass' does the opposite.
  server.listen({ onUnhandledRequest: "bypass" })
  // server.listen({ onUnhandledRequest: "error" })

  // Environment variables for testing. GITHUB_APP_ID is a set value. BOT_GITHUB_TOKEN is your github personal access token
  process.env.GITHUB_APP_ID = "230821"
  process.env.BOT_GITHUB_TOKEN = ""
})

afterAll(() => {
  // reset env
  process.env = env

  //  Close server after all tests
  server.close()
})

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())

it("Test post", async () => {
  // Print server handlers to debug and make sure all handlers are registered
  // server.printHandlers()

  let octokit = new Octokit()

  let e: CheckSuiteEvent = CheckSuiteRequestedPayload as CheckSuiteEvent
  await contentCheckOnCheckSuite({
    payload: e,
    octokit: octokit,
    id: "test",
    name: "check_suite",
  })

  let ev: CheckRunEvent = CheckRunCreatedPayload as CheckRunEvent
  await contentCheckOnCheckRun({
    payload: ev,
    octokit: octokit,
    id: "test",
    name: "check_run",
  })
}, 15000)
