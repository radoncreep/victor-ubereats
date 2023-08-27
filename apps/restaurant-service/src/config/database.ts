import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";


export function initializeDatabase() {
    const client = new Client({
        host: "127.0.0.1",
        port: 5432,
        user: "mac",
        password: "1234",
        database: "restaurant"
    });

    client.connect()
        .catch(error => console.log(`DB Connection Error: ${error}`));
    const db = drizzle(client);
    // await migrate(drizzle(client), { migrationsFolder: "migrations"});
 
    return db;
}
