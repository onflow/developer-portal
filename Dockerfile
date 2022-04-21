# base node image
FROM node:16-bullseye-slim as base

# set for base and all layer that inherit from it
ENV NODE_ENV production

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /project

ADD . .
RUN npm install --production=false

WORKDIR /project/apps/flow-docs
RUN npm install --production=false

# Setup production node_modules
FROM base as production-deps

WORKDIR /project

COPY --from=deps /project .

RUN npm install --production=false
RUN npm prune --production

WORKDIR /project/apps/flow-docs
RUN npm install --production=false
RUN npm prune --production

# Build the app
FROM base as build

WORKDIR /project

COPY --from=production-deps /project .

WORKDIR /project/apps/flow-docs
RUN npx prisma generate
RUN npx nx build flow-docs

# Finally, build the production image with minimal footprint
FROM base

WORKDIR /project
COPY --from=production-deps /project .
WORKDIR /project/apps/flow-docs

CMD ["npm", "start"]
