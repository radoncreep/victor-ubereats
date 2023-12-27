import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../schema";
import * as restaurantSchema from "../schema/restaurant";
import * as menuItemSchema from "../schema/menuItem";
import * as categorySchema from "../schema/categories";


export const nodePgconnection = new Client({
    host: process.env.POSTGRES_HOSTNAME,
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    // excluded the database field because it tries to connect to the specified db on start up
    // which will prompt an error if the db doesnt exists on the host whether local, docker or cloud
    database: process.env.POSTGRES_DB_NAME
});

export const databaseClient = drizzle(nodePgconnection, { 
    schema: { 
        ...restaurantSchema, 
        ...menuItemSchema,
        ...categorySchema
    } 
});