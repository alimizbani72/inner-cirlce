FROM imbios/bun-node:20-slim AS deps
ARG DEBIAN_FRONTEND=noninteractive

# I use Asia/Tehran as my timezone, you can change it to your timezone
RUN apt-get -y update && \
  apt-get install -yq openssl git ca-certificates tzdata && \
  ln -fs /usr/share/zoneinfo/Asia/Tehran /etc/localtime && \
  dpkg-reconfigure -f noninteractive tzdata
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Build the app
FROM deps AS builder
WORKDIR /app
COPY . .

ARG url
ARG minecraft_endpoint
ARG google_client_id
ARG google_client_secret
ARG cms_endpoint
ARG intercom_secret
ARG telegram_channel
ARG openai_api_key
ARG public_env

ENV NODE_ENV=production
ENV NEXT_PUBLIC_URL=$url
ENV NEXT_PUBLIC_MINECRAFT_ENDPOINT=$minecraft_endpoint
ENV GOOGLE_CLIENT_ID=$google_client_id
ENV GOOGLE_CLIENT_SECRET=$google_client_secret
ENV NEXT_PUBLIC_CMS_ENDPOINT=$cms_endpoint
ENV INTERCOM_SECRET=$intercom_secret
ENV NEXT_PUBLIC_TELEGRAM_CHANNEL=$telegram_channel
ENV OPENAI_API_KEY=$openai_api_key
ENV NEXT_PUBLIC_ENV=$public_env

RUN bun run build

# Production image, copy all the files and run next
FROM node:20-slim AS runner
WORKDIR /app

ARG url
ARG minecraft_endpoint
ARG google_client_id
ARG google_client_secret
ARG cms_endpoint
ARG intercom_secret
ARG telegram_channel
ARG openai_api_key
ARG public_env

ENV NODE_ENV=production
ENV NEXT_PUBLIC_URL=$url
ENV NEXT_PUBLIC_MINECRAFT_ENDPOINT=$minecraft_endpoint
ENV GOOGLE_CLIENT_ID=$google_client_id
ENV GOOGLE_CLIENT_SECRET=$google_client_secret
ENV NEXT_PUBLIC_CMS_ENDPOINT=$cms_endpoint
ENV INTERCOM_SECRET=$intercom_secret
ENV NEXT_PUBLIC_TELEGRAM_CHANNEL=$telegram_channel
ENV OPENAI_API_KEY=$openai_api_key
ENV NEXT_PUBLIC_ENV=$public_env

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3001

ENV PORT=3001

CMD ["node", "server.js"]
