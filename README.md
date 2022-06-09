

# FlowDocs

This project was generated using [Nx](https://nx.dev).

## Get Started

Project requires: 
- Node >= 16
- Yarn >= 1.22.18

### Local Development

⚠️ Must have [Docker](https://docs.docker.com/get-docker/) installed.

```
git clone https://github.com/onflow/next-docs-v1.git
```

You'll need to acquire the project's `.env` file before continuing. 
- Add the `.env` file to `/apps/flow-docs/.env`


1) `yarn`
4) `docker compose up -d` To start Redis and Postgres for the project. (use this when not running Postgres & Redis from your system)


### Running Storybook

1) `yarn run storybook`

### Running the Docs Site

1) `yarn nx run flow-docs:dev`  


# Development

⚠️ Please use **Yarn** exclusively...
- If you use `npm` by accident, remove any `package.lock` files and run `yarn` from the root.

### Installing packages

- Use `yarn add <your-dep> -W` (`-W` flag is necessary for now, or you'll get an error).
- All deps can be installed in project root.

### Building the Design System

- Do not import anything from `@remix/**` or any components/code form the `flow-docs` project into the design system. The design system is meant to be standalone, and re-usable shold we change application platforms.

### Environment Variables

- Any new environemnt variable added to `.env` in `flow-docs` should also be added to the `docker-compose.yml`

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

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
