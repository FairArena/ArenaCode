import { Hono } from "hono";
import type { AuthenticatedEnv } from "../middleware/require-auth";
import { createCheckoutUrl, createCustomerPortalUrl, hasActiveSubscription } from "../lib/polar";

const app = new Hono<AuthenticatedEnv>()
  .post("/portal", async (c) => {
    const userId = c.get("userId");

    const active = await hasActiveSubscription(userId);
    let url: string;

    if (active) {
      url = await createCustomerPortalUrl({ customerExternalId: userId, requestUrl: c.req.url });
    } else {
      url = await createCheckoutUrl({ customerExternalId: userId, requestUrl: c.req.url });
    }

    return c.json({ url });
  })
  .get("/success", (c) => c.text("Done. You can close this tab and return to ArenaCode."));

export default app;
