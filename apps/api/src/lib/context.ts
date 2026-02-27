import type { Env } from "./env";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { DBSchema } from "@cms/db";

export type AppContext = {
  Bindings: Env;
  Variables: {
    dbCache: PostgresJsDatabase<typeof DatabaseSchema>;
    dbDirect: PostgresJsDatabase<typeof DatabaseSchema>;
    }
}