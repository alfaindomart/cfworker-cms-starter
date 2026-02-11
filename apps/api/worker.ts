import { Hono } from "hono";
import { logger } from "hono/logger";
import { requestId } from "hono/request-id";
import { errorHandler, notFoundHandler } from "./src/lib/errorHandler";
import { createDb } from "./src/lib/dbProvider";
import type { Env } from "./src/lib/env";
import type { AppContext } from "./src/lib/context";

type CloudflareBindings = {
 HYPERDRIVE_CACHED: Hyperdrive;
  HYPERDRIVE_DIRECT: Hyperdrive;
} & Env


export const worker = new Hono<{
   Bindings: CloudflareBindings
   Variables: AppContext["Variables"];
   }>();

worker.onError(errorHandler);
worker.notFound(notFoundHandler);

worker.use(requestId());
worker.use(logger());

worker.use(async (c, next) => {
  const dbCache = createDb(c.env.HYPERDRIVE_CACHED);
  const dbDirect = createDb(c.env.HYPERDRIVE_DIRECT);

  c.set("dbCache", dbCache);
  c.set("dbDirect", dbDirect);
  

  await next();
});

worker.get("/", async (c) => {
  console.log("get root");
  console.log(c);
  console.log(c.var);

  return c.json({ success: true, message: "API is working" });
});




export default worker;
