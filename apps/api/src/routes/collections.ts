import { Hono } from "hono";
import * as schemaValidator from "../dtos/index"
import z from "zod";
import {zValidator} from "@hono/zod-validator";
import { createDb } from "../lib/dbProvider";
import * as schema from '@cms/db/drizzle/schema/schema'
import type { Env } from "../lib/env";

type CloudflareBindings = {
 HYPERDRIVE_CACHED: Hyperdrive;
  HYPERDRIVE_DIRECT: Hyperdrive;
} & Env

const app = new Hono<{
    Bindings: CloudflareBindings
}>()

.get("/all", async (c) => {
    console.log('getting database')
    console.log(c)
    const db = createDb(c.env.HYPERDRIVE_DIRECT)
    console.log('db established')
    console.log(c.var)
    const query = await db.select().from(schema.collections)
    if (!query || query.length === 0) {return c.json({error:"No collections found", success:false}, 404)}
    console.log('query successful')
    return c.json({
        success: true,
        data: query
    })
})

.post("/new", zValidator("json", schemaValidator.ZCollectionInsert), async (c) => {
    const body = c.req.valid("json")
    return c.json({
        success: true,
        data: body
    })
})

export default app