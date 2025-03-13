# Base Image
FROM node:22-alpine3.20 AS base

ENV DIR /app
WORKDIR $DIR
ARG NPM_TOKEN

# Development Stage
FROM base AS dev

ENV NODE_ENV=development
ENV CI=true

# Install Bun instead of pnpm
RUN npm install -g bun@1.2.5

# Copy dependency files
COPY package.json bun.lockb ./

# Install dependencies with Bun
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ".npmrc" && \
    bun install --frozen-lockfile && \
    rm -f .npmrc

# Copy config files
COPY tsconfig*.json .
COPY .swcrc .
COPY nest-cli.json .
COPY src src

EXPOSE $PORT
CMD ["bun", "run", "dev"]

# Build Stage
FROM base AS build

ENV CI=true

RUN apk update && apk add --no-cache dumb-init=1.2.5-r3 && npm install -g bun@1.2.5

COPY package.json bun.lockb ./
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ".npmrc" && \
    bun install --frozen-lockfile && \
    rm -f .npmrc

COPY tsconfig*.json .
COPY .swcrc .
COPY nest-cli.json .
COPY src src

RUN bun run build && \
    bun prune --production

# Production Stage
FROM base AS production

ENV NODE_ENV=production
ENV USER=node

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/package.json .
COPY --from=build $DIR/bun.lockb .
COPY --from=build $DIR/node_modules node_modules
COPY --from=build $DIR/dist dist

USER $USER
EXPOSE $PORT
CMD ["dumb-init", "bun", "dist/main.js"]