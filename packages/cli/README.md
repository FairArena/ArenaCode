# ArenaCode CLI

ArenaCode is a terminal AI coding agent for developers who want a fast, local-first chat experience with real tool execution, backend-controlled model routing, and up-to-date pricing.

It is built for hands-on software work: planning, coding, debugging, browsing files, running shell commands, and switching between models without hardcoding the catalog in the frontend.

## Install

```bash
npm install -g arenacode-cli
```

## Publish

To publish a new npm release from the repo root:

```bash
npm --prefix packages/cli version patch --no-git-tag-version
npm --prefix packages/cli pack --dry-run
npm --prefix packages/cli publish --access public
```

The package `prepack` script builds `dist/` automatically before publish.

## Environment

Copy `packages/cli/.env.example` to `.env` in the directory where you run the CLI and set these values:

- `API_URL`
- `CLERK_FRONTEND_API`
- `CLERK_OAUTH_CLIENT_ID`

## Start

```bash
arenacode
```

## Why It’s Different

- Terminal-first workflow designed for developers
- OpenRouter-backed model catalog with free models available from the backend
- Local tool execution for files, folders, shell commands, and workflow actions
- Session-based chat with persistent history
- Backend-driven pricing and model selection so the CLI stays thin and reliable

## What You Can Do

- Chat with an AI coding assistant directly in the terminal
- Use slash commands to open model, agent, session, theme, and permission dialogs
- Ask the agent to read files, inspect directories, and run local commands
- Continue long-running sessions with tool calls and streamed responses

## Model Catalog

ArenaCode loads supported models from the backend at runtime. That means the published CLI always reflects the current server catalog for:

- supported model IDs
- provider routing
- default model selection
- pricing metadata
- free OpenRouter model options

This architecture avoids stale hardcoded model lists in the client and keeps pricing authority on the server.