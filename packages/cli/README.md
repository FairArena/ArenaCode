# ArenaCode CLI

ArenaCode is a terminal AI coding agent for developers who want a fast, local-first chat experience with real tool execution, backend-controlled model routing, and up-to-date pricing.

It is built for hands-on software work: planning, coding, debugging, browsing files, running shell commands, and switching between models

## Install

```bash
npm install -g arenacode-cli
```


The package `prepack` script builds `dist/` automatically before publish.


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