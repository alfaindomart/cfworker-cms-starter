import { Hono } from "hono";
import * as schemaValidator from "../dtos/index"
import z from "zod";
import {zValidator} from "@hono/zod-validator";

const app = new Hono()

.get("/all", )

.post("/new", zValidator("json", schemaValidator.ZCollectionInsert), async (c) => {
    const body = c.req.valid("json")
    return c.json({
        success: true,
        data: body
    })
})