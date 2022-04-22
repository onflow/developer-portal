

# FlowDocs

Flow Documentation Site CMS Monorepo

---

## Before you start

Be sure to look through the [[WIP] Design Document for this project](https://www.notion.so/dapperlabs/New-Docs-Site-Technical-Requirements-87d502531e484735853e88e02902de25#659da2b42ca840a980e951d85d5e93fa)

---

# Development

### Install dependencies

This project requires the following on your system for local development:
-  Install [Docker](https://docs.docker.com/get-docker/)
-  Install [NodeJS](https://nodejs.org/en/download/) v16.x or above
-  Install [NX](https://nx.dev/) Monorepo tool: `npm install -g nx`

## Up and running

1) From the root of the project run `npm install --legacy-peer-deps`
2) cd into `/apps/flow-docs` and run:

    - `docker compose up -d` to start `postgres` and `redis` Docker containers. 
    - `npm run setup` to generate the `prisma` client code
    - `cd` back to the **project root** and run `nx run flow-docs:dev` to start the [Remix](https://remix.run/) app

The app should be available at `http://localhost:3000`


### What is NX?
NX is a build system an monorepo management tool that was used to scaffold this repo.
Read more here: https://nx.dev/

**`nx` commands**
All the following `nx` commands in this doc should be run from the monorepo's **root directory**.

### What is Remix?
Remix is the full-stack JS framework used to develop the site.
Read more here: https://remix.run/docs/en/v1

## Writing UI components in Storybook

The UI is developed in a second project in the monrepo located at [`/libs/design-system`](https://github.com/onflow/next-docs-v1/tree/main/libs/design-system)
- Run `nx run design-system:storybook` to launch the Storybook UI and begin developing components

#### Using components from the design system project


To import components from the `design-system` into the `flow-docs` project:

1) Make sure the component is exported in [`/libs/design-system/src/index.ts`](https://github.com/onflow/next-docs-v1/blob/main/libs/design-system/src/index.ts)
2) Import component in the `flow-docs` app using the following import syntax:
   
   - `import { YourExportedComponent } from "@flow-docs/ui";`

This is configured in [`/apps/flow-docs/tsconfig.json`](https://github.com/onflow/next-docs-v1/blob/main/apps/flow-docs/tsconfig.json)

## Running unit tests

Run `nx run flow-docs:test` to run any file in that `/apps/flow-docs/app` directory with the extension `.test.ts` or `.test.tsx`

This is configured in [`/apps/flow-docs/vitest.config.js`](https://github.com/onflow/next-docs-v1/blob/main/apps/flow-docs/vitest.config.json)

## Running end-to-end tests

E2E tests are configured to run in headless Cypress. To run E2E tests for the `flow-docs` project: 

1) Ensure the site is running and being served on `http://localhost:3000`
2) Run `nx run flow-docs-e2e:e2e` to run all Cypress tests in the [`flow-docs-e2e`](https://github.com/onflow/next-docs-v1/tree/main/apps/flow-docs-e2e) project

## Understand the workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
