import { createMiddleware } from "hono/factory";
import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { sql } from "drizzle-orm";

type Bindings = {TEST_DATABASE_URL: string};
type Variables = {db: PostgresJsDatabase};


export const dbProvider = createMiddleware<{Bindings: Bindings, Variables: Variables}>(async (c, next) => {
    const client = postgres(c.env.TEST_DATABASE_URL);
    const db = drizzle(client, {
        casing: "snake_case",
    })
    c.set("db", db);
    await next();
});