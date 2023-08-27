import dotenv from "dotenv";
dotenv.config();

import { initializeDatabase } from "./config/database";
import { initializeServer } from "./app";

export const db = initializeDatabase();
const app = initializeServer();

const PORT = process.env.PORT || 1018;

app.listen(PORT, async () => {
    console.log(`${process.env.SERVICE_NAME} running on ${PORT}`);
});
