import { Env } from "./env";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as DatabaseSchema from "@cms/db/drizzle/schema/schema";

export type AppContext = {
  Bindings: Env;
  Variables: {
    dbCache: PostgresJsDatabase<typeof DatabaseSchema>;
    dbDirect: PostgresJsDatabase<typeof DatabaseSchema>;
    }
}