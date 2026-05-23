import type { Command } from "./types";
import { getCommands } from "./commands";
import type { SupportedChatModel } from "@arenacode/shared";

export function getFilteredCommands(query: string, isAuthenticated: boolean, models: SupportedChatModel[]): Command[] {
  const filtered = getCommands(models).filter((cmd) => {
    if (cmd.name === "login" && isAuthenticated) return false;
    if (cmd.name === "logout" && !isAuthenticated) return false;
    return true;
  });

  if (query.length === 0) return filtered;
  return filtered
    .filter((cmd) => cmd.name.toLowerCase().startsWith(query.toLowerCase()));
};
