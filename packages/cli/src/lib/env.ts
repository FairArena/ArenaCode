import { existsSync } from "node:fs";
import path from "node:path";

import dotenv from "dotenv";

function collectEnvCandidates(startDir: string) {
  const candidates: string[] = [];
  let currentDir = startDir;

  while (true) {
    candidates.push(path.join(currentDir, ".env"));

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      break;
    }

    currentDir = parentDir;
  }

  return candidates;
}

export function loadCliEnv() {
  const candidates = [
    ...collectEnvCandidates(process.cwd()),
    ...collectEnvCandidates(import.meta.dirname),
  ];

  const seen = new Set<string>();

  for (const candidate of candidates) {
    if (seen.has(candidate)) {
      continue;
    }

    seen.add(candidate);

    if (existsSync(candidate)) {
      dotenv.config({ path: candidate, quiet: true });
      return candidate;
    }
  }

  dotenv.config({ quiet: true });
  return null;
}