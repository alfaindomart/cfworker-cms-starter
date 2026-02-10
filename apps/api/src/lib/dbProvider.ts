import { createMiddleware } from "hono/factory";
import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { sql } from "drizzle-orm";
import * as schema from "@cms/db/drizzle/schema/schema";

/**
 * Creates a database client using Drizzle ORM and Cloudflare Hyperdrive.
 *
 * @param db - Cloudflare Hyperdrive binding providing connection string
 */
export function createDb(db: Hyperdrive) {
  const client = postgres(db.connectionString, {
    max: 1,
    connect_timeout: 10,
    prepare: false, // Avoids prepared statement caching issues in Workers
    idle_timeout: 20,
    max_lifetime: 60 * 30,
    transform: {
      undefined: null,
    },
    onnotice: () => {},
  });

  return drizzle(client, { schema, casing: "snake_case" });
}

export { schema as Db };