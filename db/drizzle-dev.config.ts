import {config} from 'dotenv';
import { defineConfig } from 'drizzle-kit';


  config({ path: "../.dev.vars" });

const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL
if (!TEST_DATABASE_URL) {
  throw new Error("Missing Environment Variable: TEST_DATABASE_URL");
}

export default defineConfig({
    schema: './drizzle/schema/',
    out: './drizzle/dev',
    dialect: 'postgresql',
    casing: 'snake_case',
    dbCredentials: {
        url: TEST_DATABASE_URL
    },
});