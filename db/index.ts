/**
 * @file Database schema exports.
 *
 * Re-exports Drizzle ORM schemas for users, roles, and authentication.
 */

import * as schema from "./drizzle/schema/index"
import type AppContext from "@cms/api/src/lib/context"
export {schema}

export * from "./drizzle/schema"
export type DBSchema = typeof schema