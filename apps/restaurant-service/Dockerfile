FROM node:20-alpine as base 

FROM base as builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN yarn global add turbo
COPY . .
# only includes workspace(s) the immediate specified workspace depends on - out/tsconfig ubereats types
# crucially, it compares the root lockfile to the package.json of the rest-srv
# whatever deps are required by the res-srv will be included

# prunes all the source files in the current build context 
# into workspaces or files only requred by the scope into <workdir/out>
# the --docker long option, copies only what's needed to install the packages for this scope into /app/out/json
# then, copies the rest of the source files into /app/out/full
RUN turbo prune --scope=@ubereats/restaurant-service --docker 

# install deps and optimize caching with docker
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
# COPY .gitignore .gitignore
# copying over only what's needed to install the dependencies
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
# COPY --from=builder /app/out/full/turbo.json ./turbo.json
RUN yarn install --frozen-lockfile

# copy the rest of the source files
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=@ubereats/restaurant-service 
# --include-dependencies --no-deps

FROM base as runner
WORKDIR /app
# we copied the whole root from the installer stage into the working dir of this stage
# which will create a nested /app/app
# do we need the source code or just the binary from this stage
COPY --from=installer /app/ .
WORKDIR /app/apps/restaurant-service/
CMD [ "yarn", "start" ]