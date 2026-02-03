import { create } from "domain";
import { type SQL, sql } from "drizzle-orm";
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

/** 
 * user: {
 *  id: 1;
 *  name: "alfaindomart"
 *  email: "alfaindomart@email.com"
 *  settings: { theme: "dark", language: "en" }
 *  createdAt: Datenow
 *  roleId: 1
 * }
 * 
 * roles: {
 *  id: 1
 *  name: "admin"
 *  description: "Administrator with full access"
 * }, {
 *  id: 2
 *  name: "editor"
 *  description: "Editor with limited access"
 * }
 * 
 * permissions: {
 *  id: 1
 *  roleId: 1
 *  collectionId: 1
 *  canCreate: true
 *  canRead: true
 *  canUpdate: true
 *  canDelete: true
 * }, {
 *  id: 2
 *  roleId: 2
 *  collectionId: 1
 *  canCreate: true
 *  canRead: true
 *  canUpdate: true
 *  canDelete: false
 * }
 * 
 * collections: {
 *  id: 1
 *  name: "Blog Posts"
 *  slug: "blog-posts"
 * }
 * 
 * fields: {
 *  id: 1
 *  collectionId: 1
 *  name: "title"
 *  type: "string"
 * }, {
 *  id: 2
 *  collectionId: 1
 *  name: "body"
 *  type: "text"
 * }
 * 
 * entries: {
 *  id: 1
 *  collectionId: 1
 *  content: { title: "First Post", body: "This is the content of the first post." } 
 *  status: "published"
 *  createdAt: Datenow
 *  updatedAt: Datenow
 *  createdBy: 1
 *  updatedBy: 1
 * }
 * 
*/


const lower = (email: AnyPgColumn): SQL => {
  return sql`lower(${email})`;
};

export type NewUser = typeof users.$inferInsert;

export const roles = pgTable("roles", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({length: 255}).notNull().unique(),
  description: text(),
  isAdmin: boolean().notNull().default(false),
});

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

export const users = pgTable(
  "users",
  {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({length: 255}).notNull(),
    email: varchar({length: 255}).notNull(). unique(),
    passwordHash: text().notNull(),
    settings: jsonb().$type<Record<string, unknown>>(),
    createdAt: timestamp().defaultNow().notNull(),
    roleId: uuid().notNull().references(() => roles.id),
  },
  /**
   * Ensure case-insensitive uniqueness for email
   * @see https://orm.drizzle.team/docs/guides/unique-case-insensitive-email#postgresql
   */
  (table) => [uniqueIndex("emailUniqueIndex").on(lower(table.email))],
);

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
  createdBy: uuid().references(() => users.id, {onDelete: "set null"}),
  updatedBy: uuid().references(() => users.id),
}, (table) => [
  index("collection_index").on(table.collectionId),
])
