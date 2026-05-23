import { Hono } from "hono";
import { DEFAULT_CHAT_MODEL_ID } from "@arenacode/shared";
import { getSupportedChatModels } from "../lib/models";

const app = new Hono()
  .get("/", (c) => {
    return c.json({
      defaultModelId: DEFAULT_CHAT_MODEL_ID,
      models: getSupportedChatModels(),
    });
  });

export default app;