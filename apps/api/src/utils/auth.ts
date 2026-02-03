import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const auth = (env: CloudflareBindings): ReturnType<typeof betterAuth> => {
    const client = postgres(env.TEST_DATABASE_URL);
    const db = drizzle(client)

    return betterAuth({
          database: drizzleAdapter(db, { provider: 'pg'}),  // schema is required in order for bettter-auth to recognize
          baseURL: env.BETTER_AUTH_URL,
          secret: env.BETTER_AUTH_SECRET,
          emailAndPassword: { enabled: true },
          magicLink: { enabled: true }
    })
};