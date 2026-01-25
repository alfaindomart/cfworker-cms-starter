import { Hono } from "hono";
import { logger } from "hono/logger";
import { renderer } from "./renderer";
import { log } from "console";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(logger());

app.use(renderer);

app.get("/", (c) => {
  console.log("halo");
  return c.json({
    success: true,
    message: "Hello, Hono with D1!",
  });
});

app.notFound((c) => {
  return c.render(<h1>nothing here</h1>);
});

export default app;
