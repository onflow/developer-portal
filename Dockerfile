# base node image
#######################
FROM node:16 as base
#######################

# set for base and all layer that inherit from it
ENV NODE_ENV production

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl

#######################
FROM base as deps
#######################

RUN mkdir -p /project/apps/flow-docs

WORKDIR /project/

WORKDIR /project/
ADD package.json yarn.lock /app/
RUN yarn

WORKDIR /project/apps/flow-docs
ADD ./apps/flow-docs/package.json /project/apps/flow-docs/
RUN yarn --modules-folder ./node_modules


#######################
FROM deps as build
#######################

RUN mkdir -p /project/apps/flow-docs

COPY --from=deps /project/node_modules /project/node_modules
COPY --from=deps /project/apps/flow-docs/node_modules /project/apps/flow-docs/node_modules

ADD package.json /project/
ADD ./apps/flow-docs/package.json  /project/apps/flow-docs/

WORKDIR /project/

#### Adds mising dependencies. Not sure why they are missing :(
#### I suspect because we need to move all deps under "dependencies" in package.json
#### These are the NX (monorepo) build tools, tailwind cli, remix cli, prisma cli.
RUN yarn add prisma nx @nrwl/web @nrwl/react @types/react remix tailwindcss @remix-run/dev @rollup/plugin-url @svgr/rollup @tailwindcss/typography @tailwindcss/forms @tailwindcss/line-clamp @tailwindcss/aspect-ratio --dev -W
####

ADD . .
RUN yarn nx run flow-docs:build

WORKDIR /project/apps/flow-docs/
RUN yarn prisma generate 

CMD ["yarn", "start"]
