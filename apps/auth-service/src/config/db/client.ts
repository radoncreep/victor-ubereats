import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";


const dbClient = new Client({
    host: process.env.POSTGRES_HOST as string,
    port: Number(process.env.POSTGRES_PORT as string),
    user: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string
});

const db = drizzle(dbClient);

export { dbClient, db };