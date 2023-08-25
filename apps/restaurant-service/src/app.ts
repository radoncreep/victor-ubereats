import express, { json } from "express";
import routes from "./routes";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import { pgClient } from "./config/database";

const app = express();

app.use(json({ type: ["application/json"] }));
app.use("/api", routes);


(async () => {
    try {
        await pgClient.connect();
        await migrate(drizzle(pgClient), { migrationsFolder: "migrations"});
    } catch (error) {
        console.log(`DB Connection Error: ${error}`);
    }
})();

const db = drizzle(pgClient);

export { app, db };