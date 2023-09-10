import type { Config } from "drizzle-kit";

export default {
    schema: "./src/schema/*",
    driver: "pg",
    dbCredentials: {
        user: "postgres",
        host: "127.0.0.1",
        port: 5432,
        database: "ubereats_auth"
    },
    out: "./migrations"
} satisfies Config;