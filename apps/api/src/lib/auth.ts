import { betterAuth } from "better-auth";
import {passkey} from "@better-auth/passkey"
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import postgres from "postgres";
import type { DB } from "better-auth/adapters/drizzle";
import type { Env } from "./env";
import * as AuthSchema from "@cms/db/auth-schema"

type AuthEnv = Pick<Env, "APP_NAME" | "APP_ORIGIN" | "BETTER_AUTH_SECRET">

export function createAuth (env: AuthEnv, db: DB): ReturnType<typeof betterAuth> {

    const appUrl = new URL(env.APP_ORIGIN);
    const rpID = appUrl.hostname;


    return betterAuth({
        baseURL: `${env.APP_ORIGIN}/api/auth`,
        trustedOrigins: [env.APP_ORIGIN],
        secret: env.BETTER_AUTH_SECRET,
        emailAndPassword: { enabled: true },
        magicLink: { enabled: true },
        database: drizzleAdapter(db, { provider: 'pg', schema: AuthSchema}),  // schema is required in order for bettter-auth to recognize
    })
};