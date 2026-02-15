import { create } from "domain";
import { type SQL, sql } from "drizzle-orm";
import {roles, users} from "./user"
import {
  type AnyPgColumn,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  boolean,
  varchar,
  index
  
} from "drizzle-orm/pg-core";

export const permissions = pgTable("permissions", {
  id: uuid().primaryKey().defaultRandom(),
  roleId: uuid().notNull().references(() => roles.id, {onDelete: "cascade"}),
  collectionId: uuid().notNull().references(() => collections.id, {onDelete: "cascade"}),
  canCreate: boolean().notNull().default(false),
  canRead: boolean().notNull().default(true),
  canUpdate: boolean().notNull().default(false),
  canDelete: boolean().notNull().default(false),
}, (table) => [
  //Prevent duplicate rules for the same Role+Collection pair
  uniqueIndex("role_collection_unique").on(table.roleId, table.collectionId),
])


export const collections = pgTable("collections", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({length: 255}).notNull(),
  slug: varchar({length: 255}).notNull().unique(),
})

export const fields = pgTable("fields", {
  id: uuid().primaryKey().defaultRandom(),
  collectionId: uuid().notNull().references(() => collections.id, {onDelete: "cascade"}),
  name: varchar({length: 255}).notNull(), //Phone Number
  key: text().notNull(), //phone_number
  type: text().notNull(),
  options: jsonb().$type<Record<string, unknown>>(),
}, (table) => [
  //Prevent duplicate field key within the same collection
  uniqueIndex("collection_field_key_unique").on(table.collectionId, table.key),
])

export const entries = pgTable("entries", {
  id: uuid().primaryKey().defaultRandom(),
  collectionId: uuid().notNull().references(() => collections.id, {onDelete: "cascade"}),
  content: jsonb().$type<Record<string, unknown>>().notNull(),
  status: text().notNull().default("draft"),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().$onUpdate(() => new Date()),
  createdBy: text().references(() => users.id, {onDelete: "set null"}),
  updatedBy: text().references(() => users.id),
}, (table) => [
  index("collection_index").on(table.collectionId),
])

export type Collection = typeof collections.$inferSelect
export type NewCollection = typeof collections.$inferInsert
export type Field = typeof fields.$inferSelect
export type NewField = typeof fields.$inferInsert
export type Entry = typeof entries.$inferSelect
export type NewEntry = typeof entries.$inferInsert
