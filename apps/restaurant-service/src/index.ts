import dotenv from "dotenv";
dotenv.config();

import { dbClient } from "./config/database";
import { app } from "./app";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";



const PORT = Number(process.env.PORT) || 1019;

async function createDatabase() {
    const databaseName = process.env.POSTGRES_DB_NAME || "restaurantDb";
    await dbClient.connect();


    console.log("does this run?")
    const databaseExistsQuery = 'SELECT 1 FROM pg_database WHERE datname = $1';
    const result = await dbClient.query(databaseExistsQuery, [`${databaseName}`]);

    if (result.rows.length === 0) {
        console.log("creating new db")
      const createDatabaseQuery = 'CREATE DATABASE restaurantDb';
      await dbClient.query(createDatabaseQuery);
      console.log(`created database: ${databaseName}`);
      return;
    }
    console.log(`database ${databaseName} exists`)
}

(async () => {
    try {
        await createDatabase();
        console.log("Database Connected.");
    
        await migrate(drizzle(dbClient), { migrationsFolder: "migrations"});
        console.log("Migration Successful.");
     
        app.listen(PORT, () => {
            console.log(`${process.env.SERVICE_NAME} running on ${PORT}`);
        });
    } catch (error) {
        console.log(`SERVER INIT ERROR: ${error}`);
    }
})(); 
