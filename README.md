# DEPRECATED
go to https://github.com/onflow/docs

# Flow Developer Portal

This repository contains the source code that powers Flow's Developer Portal: [https://developers.flow.com](https://developers.flow.com)

## Get Started

Project requires:

- Node >= 16
- Yarn >= 1.22.18

### Local Development

⚠️ Must have [Docker](https://docs.docker.com/get-docker/) installed.

```
git clone https://github.com/onflow/developer-portal.git
```

You'll need to acquire the project's `.env` file before continuing.

1. Add the `.env` file to the project root.
1. `docker compose up`

   -or, to also bring up Storybook-

   `docker compose --profile storybook up`

Main application: http://localhost:3000/
Storybook: http://localhost:6006/ (if started using `--profile storybook`)

#### Useful docker commands and tips

Use the first version of the commands below if the your compose environment and container are running. Use the second version if the environment is not up or if you want to run them in a new container (this may leave orphan containers running if you run `docker compose down`).

- Connect to Redis via `redis-cli`:

  `docker compose exec cache redis-cli -h cache -a flow_docs`

  `docker compose run cache redis-cli -h cache -a flow_docs`

- Remove all cache data from Redis:

  `docker compose exec cache redis-cli -h cache -a flow_docs FLUSHALL`

  `docker compose run cache redis-cli -h cache -a flow_docs FLUSHALL`

- Ensure node_modules is up-to-date.

  `docker compose restart app-yarn` ()

  `docker compose run app-yarn`

#### Remote Redis cache

- Connect to redis cache server to run operations on the cache:

  `redis-cli -h <server, see in crediental management system> -p <port> --tls --cacert <cert.pem in cred. mgmt system>` ()

  `redis-cli auth <password>`

- Flush all keys from cache:

  `FLUSHALL`

#### Running services locally outside of Docker

1. Add the `.env` file to the project root.
2. `yarn`
3. (Optional, if redis is not running locally) Start a redis instance: `docker run -v redis_data:/data -p 6379:6379 --name flowdocs-cache -d redis:alpine redis-server --requirepass flow_docs`
4. Run the desired application:
   - `yarn run dev` to run the Docs Site (https://localhost:3000)
   - `yarn storybook` to run Storybook (https://localhost:6006)

# Development

⚠️ Please use **Yarn** exclusively...

- If you use `npm` by accident, remove any `package.lock` files and run `yarn` from the root.

### Installing packages

- Use `yarn add <your-dep> -W` (`-W` flag is necessary for now, or you'll get an error).
- All deps can be installed in project root.

### Building the Design System

- Do not import anything from `@remix/**` or any components/code form the app project into the design system. The design system is meant to be standalone, and re-usable shold we change application platforms.

### Environment Variables

- Any new environemnt variable added to `.env` should also be added to the `docker-compose.yml`

- Environment variables are handled different in remax apps, see documentation here https://remix.run/docs/en/v1/guides/envvars

## Documentation Sources

The doc site pull the markdown files existing in various `onflow` repositories. To see the Github Actions that triggers processing of the markdown files (i.e. refreshing cache), go to any of the repos and click on the `Actions` tab.

List of repository sources:

- [/flow](https://github.com/onflow/flow)
- [/cadence](https://github.com/onflow/cadence)
- [/flow-cli](https://github.com/onflow/flow-cli)
- [/flow-js-testing](https://github.com/onflow/flow-js-testing)
- [/flow-go-sdk](https://github.com/onflow/flow-go-sdk)
- [/fcl-js](https://github.com/onflow/fcl-js)
- [/flow-emulator](https://github.com/onflow/flow-emulator)
- [/flow-cadut](https://github.com/onflow/flow-cadut)

## Deployment

⚠ Currently data cached in redis is not invalidated from new builds, so e.g. you might see cached mdx and markdown data from previous builds. to work around this, you need to manually remove keys from redis.

Commits pushed to the `main` branch are automatically deployed to staging. Commits pushed to the `production` branch are automatically deployed to production. See [deploy.yml](.github/workflows/deploy.yml) for details.

Recommended workflow to promote changes from `main` (staging) to production is:

- Create a PR, production branch is locked down and a reviewer is required
- Test in staging when a PR is merged to `main` branch and deployed.
- Likewise, Test when PR is merged to `production` and deployed.

### Deployment takes forever or fails due to memory errors

If deploys fail to go out, and the github actions hang indefinitely, a workaround to fix this is:

1. Cancel the build
1. Delete the fly app that is prefixed with `fly-builder-`, this can be done through CLI as shown below, or through the [fly dashboard](https://fly.io/dashboard/flow-docs)

   ```bash
   $ fly apps list
   NAME                                    OWNER           STATUS  LATEST DEPLOY
   flow-docs                               flow-docs       running 2022-06-22T00:07:40Z
   flow-docs-staging                       flow-docs       running 7m45s ago
   fly-builder-muddy-wildflower-4301       flow-docs       pending
   $ fly apps destroy fly-builder-muddy-wildflower-4301
   ...
   ```

1. Re-run the build by going to the latest commit on the appropriate branch, clicking "Re-run jobs", and then "Re-run failed jobs"
1. Build should succeed

## fly.io configuration and needed updates

1. "Bad Credentials" error

- This occurs when the personal access token used expires
- Create a new personal access token with a long expiration and update fly.io
- User will need to be in `Flow Docs` organization on fly.io (Put in a IT ticket to get access if needed)
- Need to install fly.io tools `brew install flyctl` more info: https://fly.io/docs/hands-on/install-flyctl/
- List secrets for flow-docs-staging

```
 fly secrets list -a flow-docs-staging
```

- Update bot github token with new access token from a user that is in onFlow organization

```
fly secrets set BOT_GITHUB_TOKEN=github_pat_11A...MVuk -a flow-docs-staging
```

- This will trigger staging content checker webhook to be deployed using the new BOT_GITHUB_TOKEN value

## Adding Menu/Landing Images

1. There are 4 icons needed

- Landing (only needed if cms doc collection has it's own landing page like Cadence and Mobile)
- Image files go in app/ui/design-system/images/ directory
- Dropdown Menu icon named as "xxx-sm.svg"
- Menu icon, shows what section the user is on "xxxx.svg" like tool-cadence.svg, tool-mobile.svg
- Landing page icon like tool-cadence-landing.svg, configuration is located in `app/ui/design-system/src/lib/Components/InternalLandingHeader/icons.ts`

2. Images are svg so they can scale
3. Light and Dark theme changes the svg's backgrounds
4. For landing page images need to add the name to schema `app/data/doc-collection-manifest-schema.json` so that flow-docs.json validation passes
