# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Inject Kamal secrets during build
RUN --mount=type=secret,id=NEXT_PUBLIC_LOGTAIL_TOKEN \
  --mount=type=secret,id=NEXT_PUBLIC_LOGTAIL_ENDPOINT \
  --mount=type=secret,id=NEXT_PUBLIC_TURNSTILE_SITE_KEY \
  --mount=type=secret,id=SUPABASE_URL \
  --mount=type=secret,id=SUPABASE_ANON_KEY \
  --mount=type=secret,id=LOGTAIL_SERVER_TOKEN \
  --mount=type=secret,id=LOGTAIL_SERVER_ENDPOINT \
  --mount=type=secret,id=TURNSTILE_SECRET_KEY \
  NEXT_PUBLIC_LOGTAIL_TOKEN=$(cat /run/secrets/NEXT_PUBLIC_LOGTAIL_TOKEN) \
  NEXT_PUBLIC_LOGTAIL_ENDPOINT=$(cat /run/secrets/NEXT_PUBLIC_LOGTAIL_ENDPOINT) \
  NEXT_PUBLIC_TURNSTILE_SITE_KEY=$(cat /run/secrets/NEXT_PUBLIC_TURNSTILE_SITE_KEY) \
  SUPABASE_URL=$(cat /run/secrets/SUPABASE_URL) \
  SUPABASE_ANON_KEY=$(cat /run/secrets/SUPABASE_ANON_KEY) \
  LOGTAIL_SERVER_TOKEN=$(cat /run/secrets/LOGTAIL_SERVER_TOKEN) \
  LOGTAIL_SERVER_ENDPOINT=$(cat /run/secrets/LOGTAIL_SERVER_ENDPOINT) \
  TURNSTILE_SECRET_KEY=$(cat /run/secrets/TURNSTILE_SECRET_KEY) \
  npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app ./
ENV NODE_ENV=production
EXPOSE 3100

CMD ["npm", "start"]
