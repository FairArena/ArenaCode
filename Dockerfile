FROM oven/bun:1.3.14-slim

WORKDIR /app

COPY package.json bun.lock tsconfig.base.json README.md ./
COPY packages ./packages

RUN bun install --frozen-lockfile
RUN bun run --filter @arenacode/server build

EXPOSE 9876

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD bun --eval "const response = await fetch('http://127.0.0.1:9876/health'); if (!response.ok) process.exit(1);"

CMD ["bun", "packages/server/dist/index.js"]