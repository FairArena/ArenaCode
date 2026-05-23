import type { Command } from "./types";
import { COMMANDS } from "./commands";

export function getFilteredCommands(query: string, isAuthenticated: boolean): Command[] {
  const filtered = COMMANDS.filter((cmd) => {
    if (cmd.name === "login" && isAuthenticated) return false;
    if (cmd.name === "logout" && !isAuthenticated) return false;
    return true;
  });

  if (query.length === 0) return filtered;
  return filtered
    .filter((cmd) => cmd.name.toLowerCase().startsWith(query.toLowerCase()));
};
