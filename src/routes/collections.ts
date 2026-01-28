import { Hono } from "hono";
import * as schemaValidator from "../dtos/index"
import z from "zod";
import {zValidator} from "@hono/zod-validator";
import { dbProvider } from "../middleware/dbProvider";
import * as schema from '../db/schema'

const app = new Hono()

.use("*", dbProvider)

.get("/all", async (c) => {
    console.log('getting database')
    const db = c.var.db
    const query = await db.select().from(schema.collections)
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