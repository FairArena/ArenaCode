import { Hono } from "hono";
import type { AuthenticatedEnv } from "../middleware/require-auth";
import { createCheckoutUrl, createCustomerPortalUrl, hasActiveSubscription } from "../lib/polar";
import { renderSuccessPage } from "@arenacode/shared";

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
  .get("/success", (c) => {
    return c.html(
      renderSuccessPage({
        eyebrow: "Billing complete",
        title: "You're all set",
        message: "You can close this tab and return to ArenaCode.",
        detail: "Your billing flow completed successfully and the CLI can continue normally.",
        accent: "#E0AF68",
      }),
    );
  });

export default app;
