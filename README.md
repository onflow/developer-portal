

# FlowDocs

This project was generated using [Nx](https://nx.dev).

## Get Started

Project requires: 
- Node >= 16
- Yarn >= 1.22.18

### Local Development

⚠️ Must have [Docker](https://docs.docker.com/get-docker/) installed.

```
git clone https://github.com/onflow/next-docs-v2.git
```

You'll need to acquire the project's `.env` file before continuing. 
- Add the `.env` file to `/apps/flow-docs/.env`


1) `yarn`
2) `yarn prisma generate --schema ./apps/flow-docs/prisma/schema.prisma`
4) `docker compose up -d` To start Redis and Postgres for the project. (use this when not running Postgres & Redis from your system)
5) `cd apps/flow-docs` & `yarn prisma migrate dev`
6) (From project root) `yarn nx run flow-docs:build`


### Running Storybook

1) `yarn nx run design-system:storybook`

### Running the Docs Site

1) `yarn nx run flow-docs:dev`  


# Development

⚠️ Please use **Yarn** exclusively...
- If you use `npm` by accident, remove any `package.lock` files and run `yarn` from the root.

### Installing packages

- Use `yarn add <your-dep> -W` (`-W` flag is necessary for now, or you'll get an error).
- All deps can be installed in project root.

### Building the Deisgn System

- Do not import anything from `@remix/**` or any components/code form the `flow-docs` project into the design system. The design system is meant to be standalone, and re-usable shold we change application platforms.

### Environment Variables

- Any new environemnt variable added to `.env` in `flow-docs` should also be added to the `docker-compose.yml`


## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
