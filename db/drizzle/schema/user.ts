import { type SQL, sql, relations } from "drizzle-orm";
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
  index,
  unique
  
} from "drizzle-orm/pg-core";


const lower = (email: AnyPgColumn): SQL => {
  return sql`lower(${email})`;
};

export const roles = pgTable("roles", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({length: 255}).notNull().unique(),
  description: text(),
  isAdmin: boolean().notNull().default(false),
});

export const users = pgTable(
  "users",
  {
    id: text().primaryKey().default(sql`gen_random_uuid()`),
    name: varchar({length: 255}).notNull(),
    email: varchar({length: 255}).notNull(). unique(),
    emailVerified: boolean().notNull().default(false),
    image: text(),
    settings: jsonb().$type<Record<string, unknown>>(),
      createdAt: timestamp({ withTimezone: true, mode: "date" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp({ withTimezone: true, mode: "date" })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
    roleId: uuid().notNull().references(() => roles.id),
  },
  /**
   * Ensure case-insensitive uniqueness for email
   * @see https://orm.drizzle.team/docs/guides/unique-case-insensitive-email#postgresql
   */
  (table) => [uniqueIndex("emailUniqueIndex").on(lower(table.email))],
);

export const sessions = pgTable("sessions", {
    id: text().primaryKey().default(sql`gen_random_uuid()`),
    expiresAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
    token: text().notNull().unique(),
    createdAt: timestamp({ withTimezone: true, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: "date" })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text(),
    userAgent: text(),
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
}, (table) => [
    index("session_user_id_idx").on(table.userId)
]);

/**
 * Stores OAuth provider account information.
 * Matches to the `account` table in Better Auth.
 */
export const account = pgTable(
  "account",
  {
    id: text()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: timestamp({ withTimezone: true, mode: "date" }),
    refreshTokenExpiresAt: timestamp({ withTimezone: true, mode: "date" }),
    scope: text(),
    password: text(),
    createdAt: timestamp({ withTimezone: true, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: "date" })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    unique("identity_provider_account_unique").on(
      table.providerId,
      table.accountId,
    ),
    index("identity_user_id_idx").on(table.userId),
  ],
);

/**
 * Stores verification tokens (email verification, password reset, etc.)
 * Matches to the `verification` table in Better Auth.
 */
export const verification = pgTable(
  "verification",
  {
    id: text()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp({ withTimezone: true, mode: "date" }).notNull(),
    createdAt: timestamp({ withTimezone: true, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: "date" })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    unique("verification_identifier_value_unique").on(
      table.identifier,
      table.value,
    ),
    index("verification_identifier_idx").on(table.identifier),
    index("verification_value_idx").on(table.value),
    index("verification_expires_at_idx").on(table.expiresAt),
  ],
);

export const userRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  account: many(account),
}));

export const sessionRelations = relations(sessions, ({ one }) => ({
  users: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(users, {
    fields: [account.userId],
    references: [users.id],
  }),
}));

export type Roles = typeof roles.$inferSelect
export type NewRoles = typeof roles.$inferInsert
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type Account = typeof account.$inferSelect;
export type NewAccount = typeof account.$inferInsert;
export type Verification = typeof verification.$inferSelect;
export type NewVerification = typeof verification.$inferInsert;



