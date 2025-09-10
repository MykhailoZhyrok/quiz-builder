# -------- Build stage --------
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.7.1 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY tsconfig*.json ./
COPY prisma ./prisma
COPY src ./src
COPY docker ./docker

# Generate Prisma client & build Nest
RUN pnpm prisma generate
RUN pnpm build

# -------- Runtime stage --------
FROM node:20-alpine AS runtime
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.7.1 --activate

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Reuse builder's node_modules (contains prisma cli + engines + generated client)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/docker ./docker

RUN chmod +x /app/docker/entrypoint.sh
EXPOSE 4000
CMD ["/app/docker/entrypoint.sh"]
