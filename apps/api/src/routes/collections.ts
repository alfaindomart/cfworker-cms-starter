import { Hono } from "hono";
import * as schemaValidator from "../dtos/index"
import z from "zod";
import {zValidator} from "@hono/zod-validator";
import { dbProvider } from "../middleware/dbProvider";
import * as schema from '@cms/db/drizzle/schema/schema'

const app = new Hono()

.use("*", dbProvider)

.get("/all", async (c) => {
    console.log('getting database')
    console.log(c)
    const db = c.var.db
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