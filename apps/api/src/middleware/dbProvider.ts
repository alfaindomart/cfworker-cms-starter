import { createMiddleware } from "hono/factory";
import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { sql } from "drizzle-orm";

type Bindings = {CloudflareBindings: CloudflareBindings};
type Variables = {db: PostgresJsDatabase};


export const dbProvider = createMiddleware<{Bindings: Bindings, Variables: Variables}>(async (c, next) => {
    console.log('setting up database connection')
    console.log(c.env)
    const client = postgres(c.env.CloudflareBindings);
    if (!client) {
        throw new Error("Failed to create Postgres client or database url is invalid");
    }
    const db = drizzle(client, {
        casing: "snake_case",
    })
    if (!db) {
        throw new Error("Failed to initialize Drizzle ORM with Postgres client");
    }
    c.set("db", db);
    console.log('Database connection established')
    await next();
});