#!/usr/bin/env sh
set -e

export DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"

echo "=== Backend DB target (forced) ==="
echo "DATABASE_URL=$DATABASE_URL"
echo "=================================="

echo "Waiting for Postgres at ${POSTGRES_HOST}:${POSTGRES_PORT}..."
until nc -z "$POSTGRES_HOST" "$POSTGRES_PORT"; do
  sleep 0.5
done
echo "Postgres is up"

npx prisma generate
npx prisma db push
#DATABASE_URL="$DATABASE_URL" npx prisma migrate deploy || DATABASE_URL="$DATABASE_URL" npx prisma db push

node dist/main.js
