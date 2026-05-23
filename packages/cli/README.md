# ArenaCode CLI

Terminal client for ArenaCode.

## Install

```bash
npm install -g arenacode-cli
```

## Usage

```bash
arenacode
```

## What this package includes

- Terminal UI for chatting with the app's agents
- Local tool execution for file, shell, and workflow actions
- Model selection hydrated from the backend model catalog

## Model catalog and pricing

This CLI does not hardcode the model list or pricing table. It loads the available models from the backend at runtime so the server remains the source of truth for:

- supported model IDs
- provider assignment
- pricing metadata
- default model selection

That keeps the CLI thin and avoids shipping stale model prices in the frontend.