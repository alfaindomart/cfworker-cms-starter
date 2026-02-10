import { Hono } from "hono";
import { logger } from "hono/logger";
import { requestId } from "hono/request-id";
import { errorHandler, notFoundHandler } from "./src/lib/errorHandler";

type CloudflareBindings = {
 HYPERDRIVE_CACHED: Hyperdrive;
  HYPERDRIVE_DIRECT: Hyperdrive;
}


export const worker = new Hono<{ Bindings: CloudflareBindings }>();

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




export default worker;
