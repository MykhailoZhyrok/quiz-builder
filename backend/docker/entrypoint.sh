#!/usr/bin/env sh
set -e

echo "Running Prisma migrations..."
pnpm prisma migrate deploy

echo "Starting Nest app..."
node dist/main.js
