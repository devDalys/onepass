FROM node:18.18.1-alpine AS deps

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm i

FROM node:18.18.1-alpine AS builder

ARG NEXT_PUBLIC_BACKAPI
ARG NEXT_PUBLIC_YANDEX_REDIRECT

ENV NEXT_PUBLIC_BACKAPI=${NEXT_PUBLIC_BACKAPI}
ENV NEXT_PUBLIC_YANDEX_REDIRECT=${NEXT_PUBLIC_YANDEX_REDIRECT}
ENV NODE_ENV=production

WORKDIR /usr/src/app
COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules

RUN npm run build

FROM node:18.18.1-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=builder /usr/src/app/next.config.js ./
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json .

RUN mkdir -p /usr/src/app/.next/cache
RUN ln -s /tmp /usr/src/app/.next/cache/fetch-cache
RUN chown -R node /usr/src/app

USER node
EXPOSE 8080

ENTRYPOINT npm run start

