import {config} from 'dotenv';
import { defineConfig } from 'drizzle-kit';

if (process.env.ENVIRONMENT === "production") {
  config({ path: "../.prod.vars" });
} else {
  config({ path: "../.dev.vars" });
}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("Missing Environment Variable: DATABASE_URL");
}

const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL
if (!TEST_DATABASE_URL) {
  throw new Error("Missing Environment Variable: TEST_DATABASE_URL");
}

export default defineConfig({
    schema: './drizzle/schema/schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    casing: 'snake_case',
    dbCredentials: {
        url: TEST_DATABASE_URL
    },
});