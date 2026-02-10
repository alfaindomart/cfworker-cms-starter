import { Hono } from "hono";
import { logger } from "hono/logger";
import { renderer } from "../renderer";
import { log } from "console";
import collections from "./routes/collections";
import { dbProvider } from "./lib/dbProvider";
import { auth } from "./utils/auth";
import { errorHandler, notFoundHandler } from "./lib/errorHandler";

// type Bindings = {
//   DB: D1Database;
// };

export const app = new Hono<{ Bindings: CloudflareBindings }>();

app.onError(errorHandler);
app.notFound(notFoundHandler);

app.use(logger());
app.get("/", async (c) => {
  console.log("get root");
  console.log(c);
  console.log(c.var);

  return c.json({ success: true, message: "API is working" });
});
app.use("*", dbProvider);

// app.on(["GET", "POST"], "/api/*", (c) => {
//   return auth(c.env).handler(c.req.raw);
// });

// app.use(renderer);

// app.get("/", (c) => {
//   console.log("halo");
//   if (c.error) {
//     return c.json({
//       success: false,
//       message: "There was an error processing your request.",
//       error: c.error,
//     });
//   }
//   return c.json({
//     success: true,
//     message: "Hello, Hono with D1!",
//   });
// });

app.route("/collections", collections);

export default app;
