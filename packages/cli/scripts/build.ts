import { loadCliEnv } from "../src/lib/env";

const requiredEnvKeys = [
  "API_URL",
  "CLERK_FRONTEND_API",
  "CLERK_OAUTH_CLIENT_ID",
] as const;

loadCliEnv();

const missingKeys = requiredEnvKeys.filter((key) => !process.env[key]);

if (missingKeys.length > 0) {
  throw new Error(`Missing build-time environment variables: ${missingKeys.join(", ")}`);
}

const define: Record<string, string> = {};

for (const key of requiredEnvKeys) {
  define[`process.env.${key}`] = JSON.stringify(process.env[key]);
}

const result = await Bun.build({
  entrypoints: ["src/index.tsx"],
  outdir: "dist",
  target: "bun",
  define,
});

if (!result.success) {
  for (const message of result.logs) {
    console.error(message);
  }

  process.exit(1);
}