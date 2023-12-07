import dotenv from "dotenv";
dotenv.config();

import { nodePgconnection, databaseClient } from "./config/database";
import { migrate } from "drizzle-orm/node-postgres/migrator";

import { app } from "./app";


const PORT = Number(process.env.PORT) || 1018;

async function createDatabase() {
    // make sure db name is in lowercase as postgres defaults to lowercase all through if not explicity altered
    const databaseName = process.env.POSTGRES_DB_NAME || "restaurantdb";
    await nodePgconnection.connect();
    // const res = await nodePgconnection.query('SELECT current_database() as database_name');

    const databaseExistsQuery = 'SELECT 1 FROM pg_database WHERE datname = $1';
    const result = await nodePgconnection.query(databaseExistsQuery, [`${databaseName}`]);

    if (result.rowCount === 0) {
      const createDatabaseQuery = 'CREATE DATABASE restaurantDb';
      await nodePgconnection.query(createDatabaseQuery);

      console.log(`created database: ${databaseName}`);
      return;
    }
    console.log(`database ${databaseName} exists`);
}

(async () => {
    try {
        await createDatabase();
        console.log("Database Connected.");
    
        await migrate(databaseClient, { migrationsFolder: "migrations" });
        console.log("Migration Successful.");
     
        app.listen(PORT, () => {
            console.log(`${process.env.SERVICE_NAME} running on ${PORT}`);
        });
        process.setMaxListeners(0);
        process.on("exit", async() =>  {
            console.log("CLOSED ")
            await nodePgconnection.end();
            console.log("closed db connection");
        });
        process.on('uncaughtException', (error) => {
            // handle uncaught exception
            console.error('Uncaught Exception:', error);
            process.exit(1); // exit the process or take appropriate action
        });
    } catch (error) {
        console.log(`SERVER INIT ERROR: ${error}`);
    }
})(); 


// const memoryUsage = process.memoryUsage();
// console.log(`Memory Usage: ${JSON.stringify(memoryUsage)}`);