import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

console.log("name ",{
    user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOSTNAME,
        port: +process.env.POSTGRES_DB_PORT,
        database: process.env.POSTGRES_DB_NAME
})
export default {
    schema: "./src/schema/*",
    driver: "pg",
    dbCredentials: {
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOSTNAME,
        port: +process.env.POSTGRES_DB_PORT,
        database: process.env.POSTGRES_DB_NAME
    },
    out: "./migrations"
} satisfies Config;