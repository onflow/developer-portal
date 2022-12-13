This directory is for unit tests to serve the local development of the Developer Portal Content Checker

## Background

The `cms` directory contains code related to the Developer Portal Github App. To learn about Github App please take a read [here](https://docs.github.com/en/developers/apps/getting-started-with-apps/about-apps). TLDR and background knowledge on this Github App:

- Github Apps are integrated into Github repos to perform additional actions (similar to that of a plugin)
- The Developer Portal has a Github App integrated in the `onflow` organization on Github. It can then be integrated into repos under `onflow` to perform certain actions.
- This Github App uses the Checks API (more info can be found [here](https://docs.github.com/en/rest/guides/getting-started-with-the-checks-api)). This allows the app to perform actions on a pull request and it can be seen on the `checks` tab when looking at a PR in a repo with this app integrated ([here](https://github.com/onflow/fcl-js/pull/1505/checks) is an example on the `fcl-js` repo).
- The `doc-validation` directory contains code related to the "content checker" part of the app. This is where the app verifies links of changed docs files to make sure they are valid links on Github and on the Developer Portal.
- If there are invalid links, the app sends back `annotations` also via Checks API to help contributors fix these broken links

## Local development process

The app is hosted with the Developer Portal. Github unfortunately does not allow connecting to a locally hosted app so we have to use `vitest` unit test framework along with `msw` to mock Github APIs to develop locally.

In this `test` directory you can see a `fixtures` directory. This holds data related to mocking Github APIs along with any other needed data to set up the test environment.

You can run all tests by using `yarn test` command. Tests will be rerun when there's a related change.

### `webhook-content-checker.test.ts`

This is the sample test file for local development using a PR on the `fcl-js` repo. It is annotated throughout to help show how requests are mocked and how results from the content checker can be viewed. There are some important things to note:

- You'll need a Github personal access token and set it in the test file as an environment variable `BOT_GITHUB_TOKEN`. You can get one [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

- `msw` is the library used to mock requests. Github limits the API usage rates however so there's a plugin called `throttling` in `cms/github/octokit.server.ts` which limits usage rate from the app and can block development.
  - A workaround is to mock all endpoints needed and set `onUnhandledRequest: "error"` on server startup. This will blocks all unmocked requests and prints which requests are blocked.
  - Call this endpoint yourself and grab the response body. Mock the endpoint similar to other examples -> no need to hit a remote endpoint.
  - The code is in the test file.
- The `PATCH` endpoint is where Github receives data from the Github App to display on the PR. `msw` by default prints all intercepted requests but you can also print these to a separate file for easier viewing. The code is commented out in the test file.
- A trick to test on different PRs (but they have to be in the same repo) is to change the mocked PR response.
  - For example, the sample test file is checking for PR [#1505](https://github.com/onflow/fcl-js/pull/1505) in fcl-js. Say you want to test for PR [#1393](https://github.com/onflow/fcl-js/pull/1393) instead.
  - Do a `GET` call to "https://api.github.com/repos/onflow/{REPO_NAME}/pulls/{PR_ID}/files" where `REPO_NAME=fcl-js` and `PR_ID=1393` (using `curl` or whatever agent you want)
  - Grab the response and paste it into `get_PR_response.json`
  - Voilà! You just tricked the content checker to check on a different PR instead. Run the test and see the different output.
