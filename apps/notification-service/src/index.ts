import express, { json } from "express";
import dotenv from "dotenv";
dotenv.config();
import logger from "morgan";
import cors from "cors";
import { appRouter } from "./routes";


const app = express();
app
    .use(json({ type: "application/json" }))
    .use(logger("dev"))
    .use(cors())
    .use('/api', appRouter);


const PORT = process.env.PORT || 1014;
app.listen(PORT, () => { 
    console.log(`${process.env.SERVICE_NAME} Service is listening on port ${PORT}`);
});
