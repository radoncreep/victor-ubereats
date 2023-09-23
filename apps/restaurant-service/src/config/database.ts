import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";


const dbClient = new Client({
    host: process.env.POSTGRES_HOSTNAME,
    // host: "127.0.0.1",
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    // exclding database field because it tries to connect to the specified db on start up
    // which will prompt an error if the db doesnt exists on the host whether local, docker or cloud
    // database: process.env.POSTGRES_DB_NAME
});

const db = drizzle(dbClient);

export { dbClient, db };
