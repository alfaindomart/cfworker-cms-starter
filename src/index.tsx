import { Hono } from "hono";
import { logger } from "hono/logger";
import { renderer } from "./renderer";
import { log } from "console";
import collections from "./routes/collections";
import { dbProvider } from "./middleware/dbProvider";
import { auth } from "./utils/auth";

// type Bindings = {
//   DB: D1Database;
// };

export const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(logger());
app.on(["GET", "POST"], "/api/*", (c) => {
  return auth(c.env).handler(c.req.raw);
});
app.use("*", dbProvider);

// app.use(renderer);

// app.get("/", (c) => {
//   console.log("halo");
//   return c.json({
//     success: true,
//     message: "Hello, Hono with D1!",
//   });
// });

app.route("/collections", collections);

app.notFound((c) => {
  return c.render(<h1>nothing here</h1>);
});

export default app;
