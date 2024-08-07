# Development
FROM node:20-alpine as dev

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY --chown=node:node . .
COPY --chown=node:node .env.example .env

RUN npm i -g pnpm

RUN pnpm i

RUN pnpm prisma db push

USER node

# Build
FROM node:20-alpine as build

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY --chown=node:node --from=dev /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

USER node

#Prod
FROM node:20-alpine as prod

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY --chown=node:node --from=build /app/dist dist
COPY --chown=node:node --from=build /app/node_modules node_modules
COPY --chown=node:node --from=build /app/prisma dist/prisma
COPY --chown=node:node --from=build /app/.env.example .env

USER node

EXPOSE 3333

CMD ["node", "dist/src/main.js"]