import type { Config } from "drizzle-kit";

export default {
    schema: [
        "./src/domains/customer/customer.schema.ts",
        "./src/domains/vendor/vendor.schema.ts"
    ],
    driver: "pg",
    dbCredentials: {
        user: "postgres",
        host: "127.0.0.1",
        port: 5432,
        database: "auth_service_db"
    },
    out: "./migrations"
} satisfies Config;