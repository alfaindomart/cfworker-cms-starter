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

export default defineConfig({
    schema: './drizzle/schema/',
    out: './drizzle',
    dialect: 'postgresql',
    casing: 'snake_case',
    dbCredentials: {
        url: DATABASE_URL
    },
});