import { Hono } from "hono";
import { logger } from "hono/logger";
import { requestId } from "hono/request-id";
import { errorHandler, notFoundHandler } from "./src/lib/errorHandler";
import { getPlatformProxy } from "wrangler";
import { createDb } from "./src/lib/dbProvider";
import type { Env } from "./src/lib/env";
import type { AppContext } from "./src/lib/context";
import collections from "./src/routes/collections";

type CloudflareBindings = {
 HYPERDRIVE_CACHED: Hyperdrive;
  HYPERDRIVE_DIRECT: Hyperdrive;
} & Env


const worker = new Hono<{
    Bindings: CloudflareBindings
    Variables: AppContext["Variables"];
}>();

worker.onError(errorHandler);
worker.notFound(notFoundHandler);

worker.use(requestId());
worker.use(logger());

// getPlatforProxy simulate wrangler Bindings in local development
// const cf = await getPlatformProxy<CloudflareBindings>({
//   configPath: "./wrangler.jsonc",
//   environment: "dev",
//   persist: true,
// });


worker.use(async (c, next) => {
    const dbCache = createDb(c.env.HYPERDRIVE_CACHED);
    const dbDirect = createDb(c.env.HYPERDRIVE_DIRECT);

    const env = {
    ...c.env,
    APP_NAME: process.env.APP_NAME || c.env.APP_NAME || "Example",
    APP_ORIGIN:
      c.req.header("x-forwarded-origin") ||
      process.env.APP_ORIGIN ||
      c.env.APP_ORIGIN ||
      "http://localhost:5173",
  };
  console.log(c.env)
    c.set("dbCache", dbCache);
    c.set("dbDirect", dbDirect);
    await next();
})


worker.get('/', async (c) => {
  console.log('hi')
  console.log(c.var.dbCache)
   return c.json({ success: true, message: "API is working" });
})

worker.route('/collections', collections);

export default worker;
