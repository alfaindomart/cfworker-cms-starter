import { Hono } from "hono";
import { logger } from "hono/logger";
import { requestId } from "hono/request-id";
import { errorHandler, notFoundHandler } from "./src/lib/errorHandler";
import { getPlatformProxy } from "wrangler";
import { createDb } from "./src/lib/dbProvider";
import type { Env } from "./src/lib/env";
import type { AppContext } from "./src/lib/context";
import app from "./src";

type CloudflareBindings = {
 HYPERDRIVE_CACHED: Hyperdrive;
  HYPERDRIVE_DIRECT: Hyperdrive;
} & Env


export const worker = new Hono<AppContext>();

worker.onError(errorHandler);
worker.notFound(notFoundHandler);

worker.use(requestId());
worker.use(logger());
worker.get("/", async (c) => {
  console.log("get root");
  console.log(c);
  console.log(c.var);

  return c.json({ success: true, message: "API is working" });
});

// getPlatforProxy simulate wrangler Bindings in local development
const cf = await getPlatformProxy<CloudflareBindings>({
  configPath: "./wrangler.jsonc",
  environment: "dev",
  persist: true,
});

worker.use(async (c, next) => {
    const dbCache = createDb(cf.env.HYPERDRIVE_CACHED);
    const dbDirect = createDb(cf.env.HYPERDRIVE_DIRECT);

    const env = {
    ...cf.env,
    APP_NAME: process.env.APP_NAME || cf.env.APP_NAME || "Example",
    APP_ORIGIN:
      c.req.header("x-forwarded-origin") ||
      process.env.APP_ORIGIN ||
      c.env.APP_ORIGIN ||
      "http://localhost:5173",
  };
    c.set("dbCache", dbCache);
    c.set("dbDirect", dbDirect);
    await next();
})

app.route("/api", worker);


export default worker;
