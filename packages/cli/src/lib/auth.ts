import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

type AuthData = {
  token: string;
};

const AUTH_DIR = join(homedir(), ".arenacode");
const AUTH_FILE = join(AUTH_DIR, "auth.json");


type AuthListener = (data: AuthData | null) => void;
const listeners = new Set<AuthListener>();

export function addAuthListener(listener: AuthListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyAuthChange(data: AuthData | null) {
  for (const listener of listeners) {
    try {
      listener(data);
    } catch (e) {
      console.error("Auth listener failed", e);
    }
  }
}

export function getAuth(): AuthData | null {
  try {
    const data = readFileSync(AUTH_FILE, "utf-8");
    const parsed = JSON.parse(data) as Partial<AuthData>;
    return typeof parsed.token === "string" ? { token: parsed.token } : null;
  } catch {
    return null;
  }
};

export function saveAuth(data: AuthData) {
  if (!existsSync(AUTH_DIR)) {
    // Owner-only permissions (rwx------) so other users on the machine can't read tokens
    mkdirSync(AUTH_DIR, { mode: 0o700 });
  }
  writeFileSync(AUTH_FILE, JSON.stringify(data), { mode: 0o600 });
  notifyAuthChange(data);
}

export function clearAuth() {
  try {
    unlinkSync(AUTH_FILE);
  } catch {
    // File doesn't exist
  }
  notifyAuthChange(null);
}

