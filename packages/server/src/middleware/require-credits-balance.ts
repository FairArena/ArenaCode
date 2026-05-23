import { createMiddleware } from "hono/factory";
import type { AuthenticatedEnv } from "./require-auth";
import { hasActiveSubscription } from "../lib/polar";

export const requireCreditsBalance = createMiddleware<AuthenticatedEnv>(async (c, next) => {
  try {
    const userId = c.get("userId");
    const active = await hasActiveSubscription(userId);

    // This checks if the user has an active/trialing subscription to our Polar product.
    if (!active) {
      return c.json({ error: "No active subscription found. Run /usage to subscribe." }, 402);
    }

    await next();
  } catch (error) {
    console.error("Failed to verify subscription status", error);
    return c.json({ error: "Unable to verify subscription status right now." }, 503);
  }
});
