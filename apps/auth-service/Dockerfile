FROM node:20-alpine as base 

FROM base as builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@ubereats/auth-service --docker 

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=@ubereats/auth-service 

FROM base as runner
WORKDIR /app
COPY --from=installer /app/ .
WORKDIR /app/apps/auth-service/
CMD [ "yarn", "start" ]