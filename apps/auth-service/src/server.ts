import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const environment = process.env.NODE_ENV;
console.log(environment)
dotenv.config({ path: `.env.${environment}`});

import app from "./app";
import { dbClient } from "./config/db/client";


const PORT = Number(process.env.PORT || 1001);

async function createDatabase() {
    const databaseName = process.env.POSTGRES_DB_NAME || "authdb";
    await dbClient.connect();

    const databaseExistsQuery = 'SELECT 1 FROM pg_database WHERE datname = $1';
    const result = await dbClient.query(databaseExistsQuery, [`${databaseName}`]);

    if (result.rows.length === 0) {
      const createDatabaseQuery = 'CREATE DATABASE authDb';
      await dbClient.query(createDatabaseQuery);
      console.log(`created database: ${databaseName}`);
      return;
    }
    console.log(`database ${databaseName} exists`);
}

(async () => {
    try {
        await createDatabase();

        await migrate(drizzle(dbClient), { migrationsFolder: "migrations"});
        console.log("Migration Successful.");
     
        app.listen(PORT, () => {
            console.log(`${process.env.SERVICE_NAME} running on ${PORT}`);
        });
    } catch (error) {
        console.log(`SERVER INIT ERROR: ${error}`);
    }
})(); 
