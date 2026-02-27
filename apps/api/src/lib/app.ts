import { Hono } from "hono";
import type {AppContext} from "./context"

const app = new Hono<AppContext>()

app.get("/", c => c.redirect("/api"))

app.get("/api", c => {
    return c.json({
        name: "@repo/api",
        version: "0.0.0"
    })
})

app.get("/health", c => {
    return c.json({status: "healthy", timestamp: new Date().toISOString()})
})

app.on(["GET", "POST"], "/api/auth/*", c => {
    const auth = c.get("auth")
    if (!auth) {
        return c.json({ error: "Authentication service not initialized" }, 503);
    }
    return auth.handler(c.req.raw);
})

app.use("")